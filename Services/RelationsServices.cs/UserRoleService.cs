using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserRoleService : RelationService<User_Role>, IRelationService<User_Role>
    {
        public UserRoleService(WebDbContext webDbContext)
            : base(webDbContext) { }
    }
}