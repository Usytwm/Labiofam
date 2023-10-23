using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserProductController : Controller
{
    private readonly IRelationService<User_Product> _userProductService;

    public UserProductController(IRelationService<User_Product> userProductService)
    {
        _userProductService = userProductService;
    }

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
    [HttpGet("take/{size}")]
    public IEnumerable<User_Product> Take(int size) => _userProductService.Take(size);
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