using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : EntityNoModelController<Service>
    {
        public ServiceController(
            IEntityService<Service> entityService,
            IEntityNoModelService<Service> entityNoModelService
            ) : base(entityService, entityNoModelService) { }
    }
}