using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class ProductPOSController : RelationController<Product_POS>
    {
        private readonly IProductPOSService _productPOSService;

        public ProductPOSController(IRelationService<Product_POS> relationService,
            IProductPOSService productPOSService) : base(relationService)
        {
            _productPOSService = productPOSService;
        }

        /// <summary>
        /// Agrega una nueva relación entre un producto y un punto de venta.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <param name="size">Cantidad de produtos a agregar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost("{product_id}/{pos_id}/{size}")]
        public async Task<IActionResult> Add(Guid product_id, Guid pos_id, int size)
        {
            try
            {
                await _productPOSService.AddAsync(product_id, pos_id, size);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}