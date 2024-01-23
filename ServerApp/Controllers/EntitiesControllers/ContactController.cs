using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class ContactController : EntityNoDTOController<Contact>
    {
        public ContactController(
            IEntityService<Contact> entityService,
            IEntityNoDTOService<Contact> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}