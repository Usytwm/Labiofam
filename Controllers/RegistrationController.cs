using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly IRegistrationService<User, RegistrationModel> _registrationService;
        private readonly IRegistrationService<Role, RoleModel> _modelService;
        private readonly IRelationService<User_Role> _relationService;
        private readonly SignInManager<User> _signInManager;

        public RegistrationController(
            IRegistrationService<User, RegistrationModel> registrationService,
            IRegistrationService<Role, RoleModel> modelService,
            IRelationService<User_Role> relationService,
            SignInManager<User> signInManager)
        {
            _registrationService = registrationService;
            _modelService = modelService;
            _relationService = relationService;
            _signInManager = signInManager;
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
                current_user = await _registrationService.AddAsync(new_user.User!);
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
                current_role = await _modelService.AddAsync(new_user.Role!);
            }
            catch (InvalidOperationException)
            {
                current_role = await _modelService.GetAsync(new_user.Role!.Name!);
            }
            catch
            {
                await _registrationService.RemoveAsync(current_user.Id);
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
        /// <returns>Estado de la operación de inicio de sesión.</returns>
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
            return Ok();

            /*var id = _signInManager.UserManager.Users.FirstOrDefault(x => x.UserName!.Equals(login.Name))!.Id;
            var roles = await _relationService.GetRolesAsync(id);
            // Crea una lista de claims.
            var Claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, login.Name!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            // Agrega un claim por cada rol del usuario.
            foreach (var role in roles)
            {
                Claims.Add(new Claim(ClaimTypes.Role, role.Name!));
            }

            //nuevo a partir de aki
            // Crear un nuevo token.
            var token = new JwtSecurityToken(
                issuer: "{AUTH0_DOMAIN}",
                audience: "{AUTH0_AUDIENCE}",
                claims: Claims,
                expires: DateTime.UtcNow.AddSeconds(10),  // Configura la fecha de expiración según tus necesidades.
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("{YOUR_SECRET_KEY}")),
                    SecurityAlgorithms.HmacSha256));

            // Convertir el token en una cadena y devolverlo en la respuesta.
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { access_token = tokenString });//necesario devolver el token de acceso aki*/
        }
    }
}