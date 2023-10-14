namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ClientController : Controller
{
    private readonly IEntityService<Client> _clientService;

    public ClientController(IEntityService<Client> clientService)
    {
        _clientService = clientService;
    }

    [HttpGet("{client_id}")]
    public async Task<IActionResult> GetClient(Guid client_id)
    {
        try {
            var client = await _clientService.GetAsync(client_id);
            return Ok(client);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost]
    public async Task<IActionResult> AddClient(Client new_client)
    {
        try {
            await _clientService.AddAsync(new_client);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{client_id}")]
    public async Task<IActionResult> RemoveClient(Guid client_id)
    {
        try {
            await _clientService.RemoveAsync(client_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPut("{client_id}")]
    public async Task<IActionResult> EditClient(Guid client_id, Client edited_client)
    {
        try {
            await _clientService.EditAsync(client_id, edited_client);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllClients()
    {
        try {
            var clients = await _clientService.GetAllAsync();
            return Ok(clients);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllClients()
    {
        try {
            await _clientService.RemoveAllAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}