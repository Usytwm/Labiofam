using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class RoleController : EntityDTOController<Role, RoleDTO>
    {
        public RoleController(
            IEntityService<Role> entityService,
            IEntityDTOService<Role, RoleDTO> entityDTOService
            ) : base(entityService, entityDTOService) { }
    }
}