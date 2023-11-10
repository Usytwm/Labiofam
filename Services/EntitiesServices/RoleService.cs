using Labiofam.Models;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Services
{
    public class RoleService : EntityModelService<Role, RoleModel>,
        IEntityService<Role>, IEntityModelService<Role, RoleModel>
    {
        private readonly RoleManager<Role> _roleManager;

        public RoleService(WebDbContext webDbContext, RoleManager<Role> roleManager)
            : base(webDbContext)
        {
            _roleManager = roleManager;
        }

        /// <summary>
        /// Agrega un nuevo rol.
        /// </summary>
        /// <param name="new_role">El nuevo rol a agregar.</param>
        /// <returns>El rol agregado.</returns>
        public override async Task<Role> AddAsync(RoleModel new_role)
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
        /// Edita un rol por su identificador único.
        /// </summary>
        /// <param name="role_id">Identificador único del rol a editar.</param>
        /// <param name="edited_role">El rol editado.</param>
        public override async Task EditAsync(Guid role_id, RoleModel edited_role)
        {
            var current_role = await GetAsync(role_id);
            current_role.Name = edited_role.Name;
            current_role.Description = edited_role.Description;
            await _roleManager.UpdateAsync(current_role);
        }
    }
}