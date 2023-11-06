using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointOfSalesController : EntityController<Point_of_Sales>
    {
        public PointOfSalesController(IEntityService<Point_of_Sales> entityService)
            : base(entityService) { }
    }
}