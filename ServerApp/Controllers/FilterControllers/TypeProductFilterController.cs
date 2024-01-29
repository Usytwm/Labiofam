using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class TypeProductFilterController : RelationFilterController<Type_Product, Type_Price, Product>
    {
        public TypeProductFilterController(IRelationFilter<Type_Product, Type_Price, Product> relationFilter)
            : base(relationFilter) { }
    }
}