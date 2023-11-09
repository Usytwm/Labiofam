using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductPOSFilterController : RelationFilterController<Product_POS, Product, Point_of_Sales>
    {
        private readonly IProductPOSFilter _productPOSFilter;

        public ProductPOSFilterController(IRelationFilter<Product_POS, Product, Point_of_Sales> relationFilter,
            IProductPOSFilter productPOSFilter)
            : base(relationFilter)
        {
            _productPOSFilter = productPOSFilter;
        }

        // SUPER PENDIENTE
        /*[HttpPost("addtype1bytype2")]
        public async Task<IActionResult> AddType1ByType2(
            Guid type2_id, [FromBody] ICollection<Product> entities)
        {
            try
            {
                await _productPOSFilter.AddType1ByType2(type2_id, entities);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }*/
    }
}