using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleFilterController : RelationFilterController<User_Role, User, Role>
    {
        public UserRoleFilterController(IRelationFilter<User_Role, User, Role> relationFilter)
            : base(relationFilter) { }
    }
}