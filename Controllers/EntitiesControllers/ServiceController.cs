using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : Controller
    {
        private readonly IEntityService<Service> _serviceService;

        public ServiceController(IEntityService<Service> serviceService)
        {
            _serviceService = serviceService;
        }

        /// <summary>
        /// Obtiene un servicio por su ID.
        /// </summary>
        /// <param name="service_id">ID del servicio.</param>
        /// <returns>El servicio encontrado.</returns>
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

        /// <summary>
        /// Obtiene un servicio por su nombre.
        /// </summary>
        /// <param name="service_name">Nombre del servicio.</param>
        /// <returns>El servicio encontrado.</returns>
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

        /// <summary>
        /// Obtiene una lista de servicios limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de servicios.</param>
        /// <returns>La lista de servicios.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Service> Take(int size) => _serviceService.Take(size);

        /// <summary>
        /// Agrega un nuevo servicio.
        /// </summary>
        /// <param name="new_service">Nuevo servicio a agregar.</param>
        /// <returns>Estado de la operación.</returns>
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

        /// <summary>
        /// Elimina un servicio por su ID.
        /// </summary>
        /// <param name="service_id">ID del servicio a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
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

        /// <summary>
        /// Edita un servicio por su ID.
        /// </summary>
        /// <param name="service_id">ID del servicio a editar.</param>
        /// <param name="edited_service">Servicio editado.</param>
        /// <returns>Estado de la operación.</returns>
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

        /// <summary>
        /// Obtiene todos los servicios.
        /// </summary>
        /// <returns>La lista de todos los servicios.</returns>
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

        /// <summary>
        /// Elimina todos los servicios.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
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
}