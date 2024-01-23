using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class UserRoleFilterController : RelationFilterController<User_Role, User, Role>
    {
        public UserRoleFilterController(IRelationFilter<User_Role, User, Role> relationFilter)
            : base(relationFilter) { }
    }
}