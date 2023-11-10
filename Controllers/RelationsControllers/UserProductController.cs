using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProductController : RelationController<User_Product>
    {
        public UserProductController(IRelationService<User_Product> relationService)
            : base(relationService) { }
    }
}