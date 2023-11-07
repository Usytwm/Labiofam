using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "superadmin")]
    public class UserController : RegistrationController<User, RegistrationModel>
    {
        public UserController(IRegistrationService<User, RegistrationModel> entityService)
            : base(entityService) { }
    }
}