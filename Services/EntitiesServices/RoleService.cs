using Labiofam.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class RoleService : IRegistrationService<Role, RoleModel>
    {
        private readonly RoleManager<Role> _roleManager;

        public RoleService(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        /// <summary>
        /// Obtiene un rol por su identificador único.
        /// </summary>
        /// <param name="role_id">Identificador único del rol.</param>
        /// <returns>El rol encontrado.</returns>
        public async Task<Role> GetAsync(Guid role_id)
        {
            var current_role = await _roleManager.FindByIdAsync(role_id.ToString())
                ?? throw new InvalidOperationException("Role not found");
            return current_role;
        }

        /// <summary>
        /// Obtiene un rol por su nombre.
        /// </summary>
        /// <param name="role_name">Nombre del rol.</param>
        /// <returns>El rol encontrado.</returns>
        public async Task<Role> GetAsync(string role_name)
        {
            var current_role = await _roleManager.FindByNameAsync(role_name)
                ?? throw new InvalidOperationException("Role not found");
            return current_role;
        }

        /// <summary>
        /// Obtiene una lista de roles ordenados alfabéticamente y limitados por un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño máximo de la lista.</param>
        /// <returns>La lista de roles.</returns>
        public IEnumerable<Role> Take(int size) =>
            _roleManager.Roles.OrderBy(x => x.Name).Take(size);

        /// <summary>
        /// Agrega un nuevo rol.
        /// </summary>
        /// <param name="new_role">El nuevo rol a agregar.</param>
        /// <returns>El rol agregado.</returns>
        public async Task<Role> AddAsync(RoleModel new_role)
        {
            if (await _roleManager.RoleExistsAsync(new_role.Name!))
                throw new InvalidOperationException("The role already exists");

            var result = new Role()
            {
                Name = new_role.Name,
                Description = new_role.Description
            };

            await _roleManager.CreateAsync(result);
            return result;
        }

        /// <summary>
        /// Elimina un rol por su identificador único.
        /// </summary>
        /// <param name="role_id">Identificador único del rol a eliminar.</param>
        public async Task RemoveAsync(Guid role_id)
        {
            var current_role = await GetAsync(role_id);
            await _roleManager.DeleteAsync(current_role);
        }

        /// <summary>
        /// Edita un rol por su identificador único.
        /// </summary>
        /// <param name="role_id">Identificador único del rol a editar.</param>
        /// <param name="edited_role">El rol editado.</param>
        public async Task EditAsync(Guid role_id, RoleModel edited_role)
        {
            var current_role = await GetAsync(role_id);
            current_role.Name = edited_role.Name;
            current_role.Description = edited_role.Description;
            await _roleManager.UpdateAsync(current_role);
        }

        /// <summary>
        /// Obtiene una lista de todos los roles.
        /// </summary>
        /// <returns>La lista de roles.</returns>
        public async Task<List<Role>> GetAllAsync()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return roles;
        }

        /// <summary>
        /// Elimina todos los roles.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            var roles = await GetAllAsync();
            foreach (var role in roles)
                await _roleManager.DeleteAsync(role);
        }
    }
}