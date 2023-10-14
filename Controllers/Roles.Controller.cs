namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class RoleController : Controller
{
    private readonly IRoleService _productService;

    public RoleController(IRoleService productService)
    {
        _productService = productService;
    }

    [HttpGet("{role_id}")]
    public async Task<IActionResult> GetProduct(Guid role_id)
    {
        try
        {
            var role = await _productService.GetRoleAsync(role_id);
            return Ok(role);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpPost]
    public async Task<IActionResult> AddRole(Role new_product)
    {
        try
        {
            await _productService.AddRoleAsync(new_product);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{product_id}")]
    public async Task<IActionResult> RemoveRole(Guid product_id)
    {
        try
        {
            await _productService.RemoveRoleAsync(product_id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpPut("{product_id}")]
    public async Task<IActionResult> EditRole(Guid product_id, Role edited_product)
    {
        try
        {
            await _productService.EditRoleAsync(product_id, edited_product);
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
            var products = await _productService.GetAllRolesAsync();
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
            await _productService.RemoveAllRolesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}