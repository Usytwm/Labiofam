using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserRoleService : RelationService<User_Role>, IRelationService<User_Role>
    {
        private readonly WebDbContext _webDbContext;

        public UserRoleService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene una relación entre usuario y rol por sus identificadores únicos.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="role_id">Identificador único del rol.</param>
        /// <returns>La relación entre usuario y rol encontrada.</returns>
        public override async Task<User_Role> GetAsync(Guid user_id, Guid role_id)
        {
            var user_role = await _webDbContext.Set<User_Role>().FirstOrDefaultAsync(
                x => x.UserId.Equals(user_id) && x.RoleId.Equals(role_id)
            ) ?? throw new InvalidOperationException("User_Role not found");
            return user_role;
        }

        /// <summary>
        /// Agrega una nueva relación entre usuario y rol.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="role_id">Identificador único del rol.</param>
        public override async Task AddAsync(Guid user_id, Guid role_id)
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
    }
}