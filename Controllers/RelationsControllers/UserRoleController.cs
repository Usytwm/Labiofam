using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : RelationController<User_Role>
    {
        public UserRoleController(IRelationService<User_Role> relationService)
            : base(relationService) { }
    }
}