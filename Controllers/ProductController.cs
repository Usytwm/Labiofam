namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductController : Controller
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("{product_id}")]
    public async Task<IActionResult> GetProduct(Guid product_id)
    {
        try {
            var product = await _productService.GetProductAsync(product_id);
            return Ok(product);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost]
    public async Task<IActionResult> AddProduct(Product new_product)
    {
        try {
            await _productService.AddProductAsync(new_product);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{product_id}")]
    public async Task<IActionResult> RemoveProduct(Guid product_id)
    {
        try {
            await _productService.RemoveProductAsync(product_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPut("{product_id}")]
    public async Task<IActionResult> EditProduct(Guid product_id, Product edited_product)
    {
        try {
            await _productService.EditProductAsync(product_id, edited_product);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        try {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllProducts()
    {
        try {
            await _productService.RemoveAllProductsAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}