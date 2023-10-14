namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ClientController : Controller
{
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet("{client_id}")]
    public async Task<IActionResult> GetClient(Guid client_id)
    {
        try {
            var client = await _clientService.GetClientAsync(client_id);
            return Ok(client);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost]
    public async Task<IActionResult> AddClient(Client new_client)
    {
        try {
            await _clientService.AddClientAsync(new_client);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{client_id}")]
    public async Task<IActionResult> RemoveClient(Guid client_id)
    {
        try {
            await _clientService.RemoveClientAsync(client_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPut("{client_id}")]
    public async Task<IActionResult> EditClient(Guid client_id, Client edited_client)
    {
        try {
            await _clientService.EditClientAsync(client_id, edited_client);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllClients()
    {
        try {
            var clients = await _clientService.GetAllClientsAsync();
            return Ok(clients);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllClients()
    {
        try {
            await _clientService.RemoveAllClientsAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}