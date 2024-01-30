using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class TypePriceController : EntityNoDTOController<Type_Price>
    {
        public TypePriceController(
            IEntityService<Type_Price> entityService,
            IEntityNoDTOService<Type_Price> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}