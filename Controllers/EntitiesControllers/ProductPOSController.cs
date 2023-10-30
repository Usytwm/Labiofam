using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto.Engines;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductPOSController : Controller
    {
        private readonly IProductPOSService _productPOSService;

        public ProductPOSController(IProductPOSService productPOSService)
        {
            _productPOSService = productPOSService;
        }

        /// <summary>
        /// Obtiene la relación entre un producto y un punto de venta por sus IDs.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <returns>La relación entre el producto y el punto de venta.</returns>
        [HttpGet("{product_id}/{pos_id}")]
        public async Task<IActionResult> GetProductPOS(Guid product_id, Guid pos_id)
        {
            try
            {
                var product_pos = await _productPOSService.GetAsync(product_id, pos_id);
                return Ok(product_pos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de relaciones entre productos y puntos de venta limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de relaciones.</param>
        /// <returns>La lista de relaciones entre productos y puntos de venta.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Product_POS> Take(int size) => _productPOSService.Take(size);

        /// <summary>
        /// Agrega una nueva relación entre un producto y un punto de venta.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <param name="size">Cantidad de produtos a agregar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost("{product_id}/{pos_id}/[[size]]")]
        public async Task<IActionResult> AddProductPOS(Guid product_id, Guid pos_id, int size = 1)
        {
            try
            {
                if (size == 1)
                    await _productPOSService.AddAsync(product_id, pos_id);
                else
                    await _productPOSService.AddAsync(product_id, pos_id, size);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina una relación entre un producto y un punto de venta por sus IDs.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{product_id}/{pos_id}")]
        public async Task<IActionResult> RemoveProductPOS(Guid product_id, Guid pos_id)
        {
            try
            {
                await _productPOSService.RemoveAsync(product_id, pos_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todas las relaciones entre productos y puntos de venta.
        /// </summary>
        /// <returns>La lista de todas las relaciones.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllProductPOS()
        {
            try
            {
                var product_pos = await _productPOSService.GetAllAsync();
                return Ok(product_pos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todas las relaciones entre productos y puntos de venta.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllProductPOS()
        {
            try
            {
                await _productPOSService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}