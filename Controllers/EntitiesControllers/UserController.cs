using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IRegistrationService<User, RegistrationModel> _userService;

        public UserController(IRegistrationService<User, RegistrationModel> userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <returns>El usuario encontrado.</returns>
        [HttpGet("{user_id}")]
        public async Task<IActionResult> GetUser(Guid user_id)
        {
            try
            {
                var user = await _userService.GetAsync(user_id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene un usuario por su nombre.
        /// </summary>
        /// <param name="user_name">Nombre del usuario.</param>
        /// <returns>El usuario encontrado.</returns>
        [HttpGet("name/{user_name}")]
        public async Task<IActionResult> GetUser(string user_name)
        {
            try
            {
                var user = await _userService.GetAsync(user_name);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de usuarios limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de usuarios.</param>
        /// <returns>La lista de usuarios.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<User> Take(int size) => _userService.Take(size);

        /// <summary>
        /// Agrega un nuevo usuario.
        /// </summary>
        /// <param name="model">Modelo de registro del usuario.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost]
        public async Task<IActionResult> AddUser(RegistrationModel model)
        {
            try
            {
                await _userService.AddAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina un usuario por su ID.
        /// </summary>
        /// <param name="user_id">ID del usuario a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{user_id}")]
        public async Task<IActionResult> RemoveUser(Guid user_id)
        {
            try
            {
                await _userService.RemoveAsync(user_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edita un usuario por su ID.
        /// </summary>
        /// <param name="user_id">ID del usuario a editar.</param>
        /// <param name="edited_user">Modelo de registro del usuario editado.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPut("{user_id}")]
        public async Task<IActionResult> EditUser(Guid user_id, RegistrationModel edited_user)
        {
            try
            {
                await _userService.EditAsync(user_id, edited_user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todos los usuarios.
        /// </summary>
        /// <returns>La lista de todos los usuarios.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todos los usuarios.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllUsers()
        {
            try
            {
                await _userService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}