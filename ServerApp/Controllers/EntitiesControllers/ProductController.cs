using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class ProductController : EntityDTOController<Product, ProductDTO>
    {
        public ProductController(
            IEntityService<Product> entityService,
            IEntityDTOService<Product, ProductDTO> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}