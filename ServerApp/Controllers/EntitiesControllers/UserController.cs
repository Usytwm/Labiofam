using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class UserController : EntityDTOController<User, RegistrationDTO>
    {
        public UserController(
            IEntityService<User> entityService,
            IEntityDTOService<User, RegistrationDTO> entityDTOService
            ) : base(entityService, entityDTOService) { }
    }
}