using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : EntityModelController<Role, RoleModel>
    {
        public RoleController(
            IEntityService<Role> entityService,
            IEntityModelService<Role, RoleModel> entityModelService
            ) : base(entityService, entityModelService) { }
    }
}