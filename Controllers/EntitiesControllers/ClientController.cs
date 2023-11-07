using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : EntityController<Client>
    {
        public ClientController(IEntityService<Client> entityService)
            : base(entityService) { }
    }
}