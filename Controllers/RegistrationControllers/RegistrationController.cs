using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly IEntityService<User> _userService;
        private readonly IEntityService<Role> _roleService;
        private readonly IEntityModelService<User, RegistrationModel> _userModelService;
        private readonly IEntityModelService<Role, RoleModel> _roleModelService;
        private readonly IRelationService<User_Role> _relationService;
        private readonly IRelationFilter<User_Role, User, Role> _relationFilter;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<User> _signInManager;
        private readonly IAuthService _authService;

        public RegistrationController(
            IEntityService<User> userService,
            IEntityService<Role> roleService,
            IEntityModelService<User, RegistrationModel> userModelService,
            IEntityModelService<Role, RoleModel> roleModelService,
            IRelationService<User_Role> relationService,
            IRelationFilter<User_Role, User, Role> relationFilter,
            IConfiguration configuration,
            SignInManager<User> signInManager,
            IAuthService authService)
        {
            _userService = userService;
            _userModelService = userModelService;
            _roleService = roleService;
            _roleModelService = roleModelService;
            _relationService = relationService;
            _relationFilter = relationFilter;
            _configuration = configuration;
            _signInManager = signInManager;
            _authService = authService;
        }

        /// <summary>
        /// Método para registrar un nuevo usuario.
        /// </summary>
        /// <param name="new_user">Datos del nuevo usuario a registrar.</param>
        /// <returns>Estado de la operación de registro.</returns>
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestModel new_user)
        {
            User current_user;
            Role current_role;
            try
            {
                current_user = await _userModelService.AddAsync(new_user.User!);
            }
            catch (InvalidOperationException)
            {
                return BadRequest("The user name is already in use");
            }
            catch (ArgumentException)
            {
                return BadRequest("The password must contain at least 8 characters, a lower-case alphanumeric character"
                    + ", an upper-case alphanumeric character and two unique characters");
            }
            catch
            {
                return BadRequest("Fatal error");
            }
            try
            {
                current_role = await _roleModelService.AddAsync(new_user.Role!);
            }
            catch (InvalidOperationException)
            {
                current_role = await _roleService.GetAsync(new_user.Role!.Name!);
            }
            catch
            {
                await _roleService.RemoveAsync(current_user.Id);
                return BadRequest("Fatal errwor");
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
        public async Task<IActionResult> Login(LoginModel login)
        {
            var result = await _signInManager.PasswordSignInAsync(
                login.Name!,
                login.Password!,
                isPersistent: false,
                lockoutOnFailure: false);
            if (!result.Succeeded)
                return BadRequest("Wrong name or password");

            var user = await _userService.GetAsync(login.Name!);
            var roles = await _relationFilter.GetType2ByType1Async(user.Id);

            // Crea una lista de claims.
            var claims = new List<Claim>
            {
                new(ClaimTypes.Sid, user.Id.ToString()),
                new(ClaimTypes.Name, user.UserName!)
            };

            // Agrega un claim por cada rol del usuario.
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name!));
            }

            // Crear un nuevo token.
            var jwt = _authService.GenerateToken(claims, DateTime.Now.AddDays(10));

            // Configura la cookie HTTPOnly.
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Hace que la cookie sea accesible solo a través del protocolo HTTP
                //Secure = true, // Hace que la cookie se envíe solo a través de HTTPS
                SameSite = SameSiteMode.Strict, // Previene los ataques de tipo CSRF
                Expires = DateTime.Now.AddDays(10) // Establece la fecha de expiración de la cookie
            };

            Response.Cookies.Append(_configuration["Jwt:CookieName"]!, jwt, cookieOptions);

            return Ok(new { AccessToken = jwt });
        }

        /// <summary>
        /// Obtiene los datos del usuario a partir de un token.
        /// </summary>
        /// <param name="token">El token del usuario.</param>
        /// <returns>Un IActionResult que representa el resultado de la operación.</returns>
        [HttpGet("{token}")]
        public async Task<IActionResult> GetData(string token)
        {
            try
            {
                var data = await _authService.GetDataByToken(token);
                return Ok(data);
            }
            catch (ArgumentException)
            {
                return BadRequest("Token inválido o expirado");
            }
        }

        /// <summary>
        /// Cierra la sesión del usuario actual.
        /// </summary>
        /// <returns>Un IActionResult que representa el resultado de la operación.</returns>
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(_configuration["Jwt:CookieName"]!);
            return Ok(new { message = "succes" });
        }

    }
}