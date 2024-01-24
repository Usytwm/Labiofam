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
    public class RegistrationController : Controller
    {
        private readonly IEntityService<Role> _roleService;
        private readonly UserManager<User> _userService;
        private readonly IEntityDTOService<User, RegistrationDTO> _userDTOService;
        private readonly IEntityDTOService<Role, RoleDTO> _roleDTOService;
        private readonly IRelationService<User_Role> _relationService;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTService _jwtService;

        public RegistrationController(
            IEntityService<Role> roleService,
            UserManager<User> userService,
            IEntityDTOService<User, RegistrationDTO> userDTOService,
            IEntityDTOService<Role, RoleDTO> roleDTOService,
            IRelationService<User_Role> relationService,
            SignInManager<User> signInManager,
            IJWTService jwtService)
        {
            _roleService = roleService;
            _userService = userService;
            _userDTOService = userDTOService;
            _roleDTOService = roleDTOService;
            _relationService = relationService;
            _signInManager = signInManager;
            _jwtService = jwtService;
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
            var token = _jwtService.CreateJsonWebToken(current_user);

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

            var token = _jwtService.CreateJsonWebToken(user);

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
    }
}