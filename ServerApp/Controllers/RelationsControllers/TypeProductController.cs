using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class TypeProductController : RelationController<Type_Product>
    {
        public TypeProductController(IRelationService<Type_Product> relationService)
            : base(relationService) { }
    }
}