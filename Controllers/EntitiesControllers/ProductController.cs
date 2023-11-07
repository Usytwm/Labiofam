using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : EntityController<Product>
    {
        public ProductController(IEntityService<Product> entityService)
            : base(entityService) { }
    }
}