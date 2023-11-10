using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : EntityNoModelController<Client>
    {
        public ClientController(
            IEntityService<Client> entityService,
            IEntityNoModelService<Client> entityNoModelService
            ) : base(entityService, entityNoModelService) { }
    }
}