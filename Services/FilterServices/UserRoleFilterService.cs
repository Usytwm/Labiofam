using Labiofam.Models;

namespace Labiofam.Services;

public class UserRoleFilterService : 
    RelationFilterService<User_Role, User, Role>,
    IRelationFilter<User_Role, User, Role>
{
    public UserRoleFilterService(WebDbContext webDbContext,
        IRelationService<User_Role> relationService)
        : base(webDbContext, relationService) { }
}