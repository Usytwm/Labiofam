using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : Controller
{
    private readonly IEntityService<Product> _productService;

    public ProductController(IEntityService<Product> productService)
    {
        _productService = productService;
    }

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
    [HttpGet("take/{size}")]
    public IEnumerable<Product> Take(int size) => _productService.Take(size);
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