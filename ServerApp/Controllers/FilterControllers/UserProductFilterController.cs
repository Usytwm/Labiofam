using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class UserProductFilterController : RelationFilterController<User_Product, User, Product>
    {
        public UserProductFilterController(IRelationFilter<User_Product, User, Product> relationFilter)
            : base(relationFilter) { }
    }
}