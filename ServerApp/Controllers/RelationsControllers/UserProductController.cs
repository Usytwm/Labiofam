using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class UserProductController : RelationController<User_Product>
    {
        public UserProductController(IRelationService<User_Product> relationService)
            : base(relationService) { }
    }
}