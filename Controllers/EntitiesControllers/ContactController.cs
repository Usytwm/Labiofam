using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : EntityNoModelController<Contact>
    {
        public ContactController(
            IEntityService<Contact> entityService,
            IEntityNoModelService<Contact> entityNoModelService
            ) : base(entityService, entityNoModelService) { }
    }
}