using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class ServiceController : EntityNoDTOController<Service>
    {
        public ServiceController(
            IEntityService<Service> entityService,
            IEntityNoDTOService<Service> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}