using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class ProductController : EntityNoDTOController<Product>
    {
        public ProductController(
            IEntityService<Product> entityService,
            IEntityNoDTOService<Product> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}