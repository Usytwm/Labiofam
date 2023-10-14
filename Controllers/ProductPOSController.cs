namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductPOSController : Controller
{
    private readonly IRelationService<Product_POS> _productPOSService;

    public ProductPOSController(IRelationService<Product_POS> productPOSService)
    {
        _productPOSService = productPOSService;
    }

    [HttpGet("{product_id}/{pos_id}")]
    public async Task<IActionResult> GetProductPOS(Guid product_id, Guid pos_id)
    {
        try {
            var product_pos = await _productPOSService.GetAsync(product_id, pos_id);
            return Ok(product_pos);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost("{product_id}/{pos_id}")]
    public async Task<IActionResult> AddProductPOS(Guid product_id, Guid pos_id)
    {
        try {
            await _productPOSService.AddAsync(product_id, pos_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{product_id}/{pos_id}")]
    public async Task<IActionResult> RemoveProductPOS(Guid product_id, Guid pos_id)
    {
        try {
            await _productPOSService.RemoveAsync(product_id, pos_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllProductPOS()
    {
        try {
            var product_pos = await _productPOSService.GetAllAsync();
            return Ok(product_pos);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllProductPOS()
    {
        try {
            await _productPOSService.RemoveAllAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}