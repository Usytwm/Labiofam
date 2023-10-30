using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : Controller
    {
        private readonly IEntityService<Client> _clientService;

        public ClientController(IEntityService<Client> clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Obtiene un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente.</param>
        /// <returns>El cliente encontrado.</returns>
        [HttpGet("{client_id}")]
        public async Task<IActionResult> GetClient(Guid client_id)
        {
            try
            {
                var client = await _clientService.GetAsync(client_id);
                return Ok(client);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene un cliente por su nombre.
        /// </summary>
        /// <param name="client_name">Nombre del cliente.</param>
        /// <returns>El cliente encontrado.</returns>
        [HttpGet("name/{client_name}")]
        public async Task<IActionResult> GetClient(string client_name)
        {
            try
            {
                var client = await _clientService.GetAsync(client_name);
                return Ok(client);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de clientes limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de clientes.</param>
        /// <returns>La lista de clientes.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Client> Take(int size) => _clientService.Take(size);

        /// <summary>
        /// Agrega un nuevo cliente.
        /// </summary>
        /// <param name="new_client">Nuevo cliente a agregar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost]
        public async Task<IActionResult> AddClient(Client new_client)
        {
            try
            {
                await _clientService.AddAsync(new_client);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{client_id}")]
        public async Task<IActionResult> RemoveClient(Guid client_id)
        {
            try
            {
                await _clientService.RemoveAsync(client_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edita un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente a editar.</param>
        /// <param name="edited_client">Cliente editado.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPut("{client_id}")]
        public async Task<IActionResult> EditClient(Guid client_id, Client edited_client)
        {
            try
            {
                await _clientService.EditAsync(client_id, edited_client);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todos los clientes.
        /// </summary>
        /// <returns>La lista de todos los clientes.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            try
            {
                var clients = await _clientService.GetAllAsync();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todos los clientes.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllClients()
        {
            try
            {
                await _clientService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}