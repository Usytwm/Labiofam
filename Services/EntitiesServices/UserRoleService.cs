using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly WebDbContext _webDbContext;
        private readonly RoleService _roleservice;//inyeccion de dependencia

        public UserRoleService(WebDbContext webDbContext, RoleService roleservice)
        {
            _webDbContext = webDbContext;
            _roleservice = roleservice;
        }

        /// <summary>
        /// Obtiene una relación entre usuario y rol por sus identificadores únicos.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="role_id">Identificador único del rol.</param>
        /// <returns>La relación entre usuario y rol encontrada.</returns>
        public async Task<User_Role> GetAsync(Guid user_id, Guid role_id)
        {
            var user_role = await _webDbContext.User_Role!.FirstOrDefaultAsync(
                x => x.UserId.Equals(user_id) && x.RoleId.Equals(role_id)
            ) ?? throw new InvalidOperationException("User_Role not found");
            return user_role;
        }

        /// <summary>
        /// Obtiene una lista de relaciones entre usuario y rol limitada por un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño máximo de la lista.</param>
        /// <returns>La lista de relaciones entre usuario y rol.</returns>
        public IEnumerable<User_Role> Take(int size) =>
            _webDbContext.User_Role!.Take(size);

        /// <summary>
        /// Agrega una nueva relación entre usuario y rol.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="role_id">Identificador único del rol.</param>
        public async Task AddAsync(Guid user_id, Guid role_id)
        {
            try
            {
                await GetAsync(user_id, role_id);
                throw new InvalidOperationException("The User_Role already exists");
            }
            catch
            {
                await _webDbContext.AddAsync(new User_Role()
                {
                    UserId = user_id,
                    RoleId = role_id
                });
                await _webDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Elimina una relación entre usuario y rol por sus identificadores únicos.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="role_id">Identificador único del rol.</param>
        public async Task RemoveAsync(Guid user_id, Guid role_id)
        {
            var current_user_role = await GetAsync(user_id, role_id);
            _webDbContext.Remove(current_user_role);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene una lista de todas las relaciones entre usuario y rol.
        /// </summary>
        /// <returns>La lista de relaciones entre usuario y rol.</returns>
        public async Task<List<User_Role>> GetAllAsync()
        {
            var user_role = await _webDbContext.User_Role!.ToListAsync();
            return user_role;
        }

        /// <summary>
        /// Elimina todas las relaciones entre usuario y rol.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.User_Role!);
            await _webDbContext.SaveChangesAsync();
        }

        public async Task<List<Role>> GetRolesAsync(Guid user_id)
        {
            var userRoles = _webDbContext.User_Role!.Where(x => x.UserId.Equals(user_id)).ToList<User_Role>();

            var roles = new List<Role>();
            foreach (var userRole in userRoles)
            {
                var role = await _roleservice.GetAsync(userRole.RoleId);
                roles.Add(role);
            }

            return roles;
        }

    }
}