using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : EntityController<Contact>
    {
        public ContactController(IEntityService<Contact> entityService)
            : base(entityService) { }
    }
}