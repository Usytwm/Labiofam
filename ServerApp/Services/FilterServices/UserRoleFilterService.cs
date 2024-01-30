using Labiofam.Models;

namespace Labiofam.Services
{
    public class UserRoleFilterService :
        RelationFilterService<User_Role, User, Role>,
        IRelationFilter<User_Role, User, Role>
    {
        public UserRoleFilterService(
            WebDbContext webDbContext,
            IRelationService<User_Role> relationService,
            IEntityService<User> entityService1,
            IEntityService<Role> entityService2
            ) : base(webDbContext, relationService, entityService1, entityService2) { }
    }
}
