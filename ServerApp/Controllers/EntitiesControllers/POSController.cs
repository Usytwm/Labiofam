using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "superadmin")]
    public class PointOfSalesController : EntityNoDTOController<Point_of_Sales>
    {
        public PointOfSalesController(
            IEntityService<Point_of_Sales> entityService,
            IEntityNoDTOService<Point_of_Sales> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}