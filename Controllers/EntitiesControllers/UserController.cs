using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : RegistrationController<User, RegistrationModel>
    {
        public UserController(IRegistrationService<User, RegistrationModel> entityService)
            : base(entityService) { }
    }
}