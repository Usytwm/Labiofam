using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IEntityService<Product> _productService;

        public ProductController(IEntityService<Product> productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// Obtiene un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <returns>El producto encontrado.</returns>
        [HttpGet("{product_id}")]
        public async Task<IActionResult> GetProduct(Guid product_id)
        {
            try
            {
                var product = await _productService.GetAsync(product_id);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene un producto por su nombre.
        /// </summary>
        /// <param name="product_name">Nombre del producto.</param>
        /// <returns>El producto encontrado.</returns>
        [HttpGet("name/{product_name}")]
        public async Task<IActionResult> GetProduct(string product_name)
        {
            try
            {
                var product = await _productService.GetAsync(product_name);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de productos limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de productos.</param>
        /// <returns>La lista de productos.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Product> Take(int size) => _productService.Take(size);

        /// <summary>
        /// Agrega un nuevo producto.
        /// </summary>
        /// <param name="new_product">Nuevo producto a agregar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost]
        public async Task<IActionResult> AddProduct(Product new_product)
        {
            try
            {
                await _productService.AddAsync(new_product);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{product_id}")]
        public async Task<IActionResult> RemoveProduct(Guid product_id)
        {
            try
            {
                await _productService.RemoveAsync(product_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edita un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto a editar.</param>
        /// <param name="edited_product">Producto editado.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPut("{product_id}")]
        public async Task<IActionResult> EditProduct(Guid product_id, Product edited_product)
        {
            try
            {
                await _productService.EditAsync(product_id, edited_product);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todos los productos.
        /// </summary>
        /// <returns>La lista de todos los productos.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _productService.GetAllAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todos los productos.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllProducts()
        {
            try
            {
                await _productService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}