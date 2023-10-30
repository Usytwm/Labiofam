using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IRegistrationService<Role, RoleModel> _roleService;

        public RoleController(IRegistrationService<Role, RoleModel> roleService)
        {
            _roleService = roleService;
        }

        /// <summary>
        /// Obtiene un rol por su ID.
        /// </summary>
        /// <param name="role_id">ID del rol.</param>
        /// <returns>El rol encontrado.</returns>
        [HttpGet("{role_id}")]
        public async Task<IActionResult> GetRole(Guid role_id)
        {
            try
            {
                var role = await _roleService.GetAsync(role_id);
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene un rol por su nombre.
        /// </summary>
        /// <param name="role_name">Nombre del rol.</param>
        /// <returns>El rol encontrado.</returns>
        [HttpGet("name/{role_name}")]
        public async Task<IActionResult> GetRole(string role_name)
        {
            try
            {
                var role = await _roleService.GetAsync(role_name);
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de roles limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de roles.</param>
        /// <returns>La lista de roles.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Role> Take(int size) => _roleService.Take(size);

        /// <summary>
        /// Agrega un nuevo rol.
        /// </summary>
        /// <param name="new_role">Nuevo rol a agregar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost]
        public async Task<IActionResult> AddRole(RoleModel new_role)
        {
            try
            {
                await _roleService.AddAsync(new_role);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina un rol por su ID.
        /// </summary>
        /// <param name="role_id">ID del rol a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{role_id}")]
        public async Task<IActionResult> RemoveRole(Guid role_id)
        {
            try
            {
                await _roleService.RemoveAsync(role_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edita un rol por su ID.
        /// </summary>
        /// <param name="role_id">ID del rol a editar.</param>
        /// <param name="edited_role">Rol editado.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPut("{role_id}")]
        public async Task<IActionResult> EditRole(Guid role_id, RoleModel edited_role)
        {
            try
            {
                await _roleService.EditAsync(role_id, edited_role);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todos los roles.
        /// </summary>
        /// <returns>La lista de todos los roles.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                var roles = await _roleService.GetAllAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todos los roles.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllRoles()
        {
            try
            {
                await _roleService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}