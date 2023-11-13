using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProductFilterController : RelationFilterController<User_Product, User, Product>
    {
        public UserProductFilterController(IRelationFilter<User_Product, User, Product> relationFilter)
            : base(relationFilter) { }
    }
}