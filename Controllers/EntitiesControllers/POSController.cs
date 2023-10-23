using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PointOfSalesController : Controller
{
    private readonly IEntityService<Point_of_Sales> _posService;

    public PointOfSalesController(IEntityService<Point_of_Sales> posService)
    {
        _posService = posService;
    }

    [HttpGet("{pos_id}")]
    public async Task<IActionResult> GetPos(Guid pos_id)
    {
        try
        {
            var pos = await _posService.GetAsync(pos_id);
            return Ok(pos);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet("name/{pos_name}")]
    public async Task<IActionResult> GetPos(string pos_name)
    {
        try
        {
            var pos = await _posService.GetAsync(pos_name);
            return Ok(pos);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet("take/{size}")]
    public IEnumerable<Point_of_Sales> Take(int size) => _posService.Take(size);
    [HttpPost]
    public async Task<IActionResult> AddPos(Point_of_Sales new_pos)
    {
        try
        {
            await _posService.AddAsync(new_pos);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{pos_id}")]
    public async Task<IActionResult> RemovePos(Guid pos_id)
    {
        try
        {
            await _posService.RemoveAsync(pos_id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpPut("{pos_id}")]
    public async Task<IActionResult> EditPos(Guid pos_id, Point_of_Sales edited_pos)
    {
        try
        {
            await _posService.EditAsync(pos_id, edited_pos);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllPoss()
    {
        try
        {
            var poss = await _posService.GetAllAsync();
            return Ok(poss);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllPoss()
    {
        try
        {
            await _posService.RemoveAllAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}