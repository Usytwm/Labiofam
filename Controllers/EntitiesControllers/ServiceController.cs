using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceController : Controller
{
    private readonly IEntityService<Service> _serviceService;

    public ServiceController(IEntityService<Service> serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpGet("{service_id}")]
    public async Task<IActionResult> GetService(Guid service_id)
    {
        try
        {
            var service = await _serviceService.GetAsync(service_id);
            return Ok(service);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet("name/{service_name}")]
    public async Task<IActionResult> GetService(string service_name)
    {
        try
        {
            var service = await _serviceService.GetAsync(service_name);
            return Ok(service);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet("take/{size}")]
    public IEnumerable<Service> Take(int size) => _serviceService.Take(size);
    [HttpPost]
    public async Task<IActionResult> AddService(Service new_service)
    {
        try
        {
            await _serviceService.AddAsync(new_service);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{service_id}")]
    public async Task<IActionResult> RemoveService(Guid service_id)
    {
        try
        {
            await _serviceService.RemoveAsync(service_id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpPut("{service_id}")]
    public async Task<IActionResult> EditService(Guid service_id, Service edited_service)
    {
        try
        {
            await _serviceService.EditAsync(service_id, edited_service);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllServices()
    {
        try
        {
            var services = await _serviceService.GetAllAsync();
            return Ok(services);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllServices()
    {
        try
        {
            await _serviceService.RemoveAllAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}