using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Security;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class RegistrationController : ControllerBase
    {
        private readonly IEntityService<Role> _roleService;
        private readonly UserManager<User> _userService;
        private readonly IEntityDTOService<User, RegistrationDTO> _userDTOService;
        private readonly IEntityDTOService<Role, RoleDTO> _roleDTOService;
        private readonly IRelationService<User_Role> _relationService;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTService _jwtService;
        private readonly IRelationFilter<User_Role, User, Role> _relationFilter;

        public RegistrationController(
            IEntityService<Role> roleService,
            UserManager<User> userService,
            IEntityDTOService<User, RegistrationDTO> userDTOService,
            IEntityDTOService<Role, RoleDTO> roleDTOService,
            IRelationService<User_Role> relationService,
            SignInManager<User> signInManager,
            IJWTService jwtService,
            IRelationFilter<User_Role, User, Role> relationFilter)
        {
            _roleService = roleService;
            _userService = userService;
            _userDTOService = userDTOService;
            _roleDTOService = roleDTOService;
            _relationService = relationService;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _relationFilter = relationFilter;
        }

        /// <summary>
        /// Método para registrar un nuevo usuario.
        /// </summary>
        /// <param name="new_user">Datos del nuevo usuario a registrar.</param>
        /// <returns>Estado de la operación de registro.</returns>
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDTO new_user)
        {
            User current_user;
            Role current_role;

            try
            {
                current_user = await _userDTOService.AddAsync(new_user.User!);
            }
            catch (PasswordException)
            {
                return BadRequest("The password must contain at least 8 "
                    + "characters, a lower-case alphanumeric character, an "
                    + "upper-case alphanumeric character and two unique characters");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                current_role = await _roleService.GetAsync(new_user.Role!.Name!);
            }
            catch (InvalidOperationException)
            {
                current_role = await _roleDTOService.AddAsync(new_user.Role!);
            }
            catch (Exception ex) /////////////////////////////////////
            {
                await _userService.DeleteAsync(current_user);
                return BadRequest(ex.Message);
            }

            await _relationService.AddAsync(current_user.Id, current_role.Id);

            await _signInManager.SignInAsync(current_user, isPersistent: false);

            var roles = await _relationFilter.GetType2ByType1Async(current_user.Id);

            var token = _jwtService.CreateJsonWebToken(current_user, roles);
            current_user.RefreshToken = token.RefreshToken;
            current_user.RefreshTokenExpirationDate = token.RefreshTokenExpirationDate;
            await _userService.UpdateAsync(current_user);

            return Ok(token);
        }

        /// <summary>
        /// Método para realizar el inicio de sesión de un usuario.
        /// </summary>
        /// <param name="login">Datos de inicio de sesión del usuario.</param>
        /// <returns>Token de inicio de sesión.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO login)
        {
            if (login.Name.IsNullOrEmpty() && login.Email.IsNullOrEmpty())
                return BadRequest("Name and Email can't be null at the same time");
            else if (!login.Name.IsNullOrEmpty() && !login.Email.IsNullOrEmpty())
                return BadRequest("Only one value can be provided for Name or Email");

            User? user;

            if (!login.Name.IsNullOrEmpty())
            {
                user = await _userService.FindByNameAsync(login.Name!);
                if (user is null)
                    return BadRequest("Wrong Name");
            }
            else
            {
                user = await _userService.FindByEmailAsync(login.Email!);
                if (user is null)
                    return BadRequest("Wrong Email");
            }

            var result = await _signInManager.PasswordSignInAsync(
                    user.Name!,
                    login.Password!,
                    isPersistent: false,
                    lockoutOnFailure: false);
            if (!result.Succeeded)
                return BadRequest("Wrong Password");

            await _signInManager.SignInAsync(user, isPersistent: false);

            var roles = await _relationFilter.GetType2ByType1Async(user.Id);

            var token = _jwtService.CreateJsonWebToken(user, roles);
            user.RefreshToken = token.RefreshToken;
            user.RefreshTokenExpirationDate = token.RefreshTokenExpirationDate;
            await _userService.UpdateAsync(user);

            return Ok(token);
        }

        /// <summary>
        /// Cierra la sesión del usuario actual.
        /// </summary>
        /// <returns>Estado de la operación de Logout.</returns>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Success");
        }

        [HttpPost("getnewaccesstoken")]
        public async Task<IActionResult> GenerateNewAccessToken(TokenDTO model)
        {
            try
            {
                var principal = _jwtService.GetPrincipalFromJWT(model.Token!);
                if (principal is null)
                    return BadRequest("Invalid token");

                var email = principal.FindFirstValue(ClaimTypes.Email);
                var user = await _userService.FindByEmailAsync(email!);
                if (user is null || !user.RefreshToken!.Equals(model.RefreshToken)
                    || user.RefreshTokenExpirationDate <= DateTime.Now)
                {
                    return BadRequest("Invalid refresh token");
                }

                var roles = await _relationFilter.GetType2ByType1Async(user.Id);

                var result = _jwtService.CreateJsonWebToken(user, roles);
                user.RefreshToken = result.RefreshToken;
                user.RefreshTokenExpirationDate = result.RefreshTokenExpirationDate;
                await _userService.UpdateAsync(user);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("token/{token}")]
        public async Task<IActionResult> DataByToken(string token)
        {
            try
            {
                var principal = _jwtService.GetPrincipalFromJWT(token);
                if (principal is null)
                    return BadRequest("Invalid token");

                // var userId = userData[JwtRegisteredClaimNames.Sub];
                var useremail = principal.FindFirstValue(ClaimTypes.Email);
                var user = await _userService.FindByEmailAsync(useremail!);
                // Ahora puedes usar userId, userName y userEmail como desees
                RegistrationRequestDTO data = new RegistrationRequestDTO()
                {
                    User = new RegistrationDTO()
                    {
                        Name = user!.Name,
                        Email = user.Email,
                        Phone = user.PhoneNumber,
                        Image = user.Image

                    },
                    Role = new RoleDTO()
                    {
                        Name = "superadmin",
                        Description = "todos los permisos"
                    }
                };

                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }


    }
}