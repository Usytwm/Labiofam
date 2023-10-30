using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : Controller
    {
        private readonly IRelationService<User_Role> _userRoleService;

        public UserRoleController(IRelationService<User_Role> userRoleService)
        {
            _userRoleService = userRoleService;
        }

        /// <summary>
        /// Obtiene la relación entre un usuario y un rol por sus IDs.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <param name="role_id">ID del rol.</param>
        /// <returns>La relación entre el usuario y el rol.</returns>
        [HttpGet("{user_id}/{role_id}")]
        public async Task<IActionResult> GetUserRole(Guid user_id, Guid role_id)
        {
            try
            {
                var user_role = await _userRoleService.GetAsync(user_id, role_id);
                return Ok(user_role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de relaciones entre usuarios y roles limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de relaciones.</param>
        /// <returns>La lista de relaciones entre usuarios y roles.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<User_Role> Take(int size) => _userRoleService.Take(size);

        /// <summary>
        /// Agrega una nueva relación entre un usuario y un rol.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <param name="role_id">ID del rol.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost("{user_id}/{role_id}")]
        public async Task<IActionResult> AddUserRole(Guid user_id, Guid role_id)
        {
            try
            {
                await _userRoleService.AddAsync(user_id, role_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina una relación entre un usuario y un rol por sus IDs.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <param name="role_id">ID del rol.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{user_id}/{role_id}")]
        public async Task<IActionResult> RemoveUserRole(Guid user_id, Guid role_id)
        {
            try
            {
                await _userRoleService.RemoveAsync(user_id, role_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todas las relaciones entre usuarios y roles.
        /// </summary>
        /// <returns>La lista de todas las relaciones.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllUserRole()
        {
            try
            {
                var user_role = await _userRoleService.GetAllAsync();
                return Ok(user_role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todas las relaciones entre usuarios y roles.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllUserRole()
        {
            try
            {
                await _userRoleService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}