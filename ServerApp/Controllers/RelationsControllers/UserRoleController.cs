using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class UserRoleController : RelationController<User_Role>
    {
        public UserRoleController(IRelationService<User_Role> relationService)
            : base(relationService) { }
    }
}