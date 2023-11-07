using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : RegistrationController<Role, RoleModel>
    {
        public RoleController(IRegistrationService<Role, RoleModel> entityService)
            : base(entityService) { }
    }
}