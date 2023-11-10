using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : EntityModelController<User, RegistrationModel>
    {
        public UserController(
            IEntityService<User> entityService,
            IEntityModelService<User, RegistrationModel> entityModelService
            ) : base(entityService, entityModelService) { }
    }
}