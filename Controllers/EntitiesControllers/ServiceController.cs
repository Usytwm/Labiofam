using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : EntityController<Service>
    {
        public ServiceController(IEntityService<Service> entityService)
            : base(entityService) { }
    }
}