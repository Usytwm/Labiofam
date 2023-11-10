using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : EntityNoModelController<Product>
    {
        public ProductController(
            IEntityService<Product> entityService,
            IEntityNoModelService<Product> entityNoModelService
            ) : base(entityService, entityNoModelService) { }
    }
}