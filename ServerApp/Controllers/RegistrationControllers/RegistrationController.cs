using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Security;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class RegistrationController : Controller
    {
        private readonly IEntityService<Role> _roleService;
        private readonly IEntityDTOService<User, RegistrationDTO> _userDTOService;
        private readonly IEntityDTOService<Role, RoleDTO> _roleDTOService;
        private readonly IRelationService<User_Role> _relationService;
        private readonly SignInManager<User> _signInManager;

        public RegistrationController(
            IEntityService<Role> roleService,
            IEntityDTOService<User, RegistrationDTO> userDTOService,
            IEntityDTOService<Role, RoleDTO> roleDTOService,
            IRelationService<User_Role> relationService,
            SignInManager<User> signInManager)
        {
            _roleService = roleService;
            _userDTOService = userDTOService;
            _roleDTOService = roleDTOService;
            _relationService = relationService;
            _signInManager = signInManager;
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
            catch (InvalidOperationException)
            {
                return Problem(detail: "The user name is already in use",
                    statusCode: 404, title: "User problem");
            }
            catch (NullReferenceException)
            {
                return Problem(detail: "The email value can't be null",
                    statusCode: 404, title: "Email problem");
            }
            catch (ArgumentException)
            {
                return Problem(detail: "The email is in an invalid format",
                    statusCode: 404, title: "Email problem");
            }
            catch (PasswordException)
            {
                return Problem(detail: "The password must contain at least 8 "
                    + "characters, a lower-case alphanumeric character, an "
                    + "upper-case alphanumeric character and two unique characters",
                    statusCode: 404, title: "Password problem");
            }
            catch
            {
                return BadRequest("Fatal error");
            }
            
            try
            {
                current_role = await _roleDTOService.AddAsync(new_user.Role!);
            }
            catch (InvalidOperationException)
            {
                current_role = await _roleService.GetAsync(new_user.Role!.Name!);
            }
            catch
            {
                await _roleService.RemoveAsync(current_user.Id);
                return BadRequest("Fatal error");
            }

            await _relationService.AddAsync(current_user.Id, current_role.Id);
            await _signInManager.SignInAsync(current_user, isPersistent: false);
            return Ok();
        }

        /// <summary>
        /// Método para realizar el inicio de sesión de un usuario.
        /// </summary>
        /// <param name="login">Datos de inicio de sesión del usuario.</param>
        /// <returns>Token de inicio de sesión.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO login)
        {
            var result = await _signInManager.PasswordSignInAsync(
                login.Name!,
                login.Password!,
                isPersistent: false,
                lockoutOnFailure: false);
            if (!result.Succeeded)
                return BadRequest("Wrong name or password");
            return Ok();
        }

        /// <summary>
        /// Cierra la sesión del usuario actual.
        /// </summary>
        /// <returns>Estado de la operación de Logout.</returns>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { Message = "Success" });
        }
    }
}