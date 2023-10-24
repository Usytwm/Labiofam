using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProductController : Controller
    {
        private readonly IRelationService<User_Product> _userProductService;

        public UserProductController(IRelationService<User_Product> userProductService)
        {
            _userProductService = userProductService;
        }

        /// <summary>
        /// Obtiene la relación entre un usuario y un producto por sus IDs.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <param name="product_id">ID del producto.</param>
        /// <returns>La relación entre el usuario y el producto.</returns>
        [HttpGet("{user_id}/{product_id}")]
        public async Task<IActionResult> GetUserProduct(Guid user_id, Guid product_id)
        {
            try
            {
                var user_product = await _userProductService.GetAsync(user_id, product_id);
                return Ok(user_product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de relaciones entre usuarios y productos limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de relaciones.</param>
        /// <returns>La lista de relaciones entre usuarios y productos.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<User_Product> Take(int size) => _userProductService.Take(size);

        /// <summary>
        /// Agrega una nueva relación entre un usuario y un producto.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <param name="product_id">ID del producto.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost("{user_id}/{product_id}")]
        public async Task<IActionResult> AddUserProduct(Guid user_id, Guid product_id)
        {
            try
            {
                await _userProductService.AddAsync(user_id, product_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina una relación entre un usuario y un producto por sus IDs.
        /// </summary>
        /// <param name="user_id">ID del usuario.</param>
        /// <param name="product_id">ID del producto.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{user_id}/{product_id}")]
        public async Task<IActionResult> RemoveUserProduct(Guid user_id, Guid product_id)
        {
            try
            {
                await _userProductService.RemoveAsync(user_id, product_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todas las relaciones entre usuarios y productos.
        /// </summary>
        /// <returns>La lista de todas las relaciones.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllUserProduct()
        {
            try
            {
                var user_product = await _userProductService.GetAllAsync();
                return Ok(user_product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todas las relaciones entre usuarios y productos.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllUserProduct()
        {
            try
            {
                await _userProductService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}