using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointOfSalesController : Controller
    {
        private readonly IEntityService<Point_of_Sales> _posService;

        public PointOfSalesController(IEntityService<Point_of_Sales> posService)
        {
            _posService = posService;
        }

        /// <summary>
        /// Obtiene un punto de venta por su ID.
        /// </summary>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <returns>El punto de venta encontrado.</returns>
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

        /// <summary>
        /// Obtiene un punto de venta por su nombre.
        /// </summary>
        /// <param name="pos_name">Nombre del punto de venta.</param>
        /// <returns>El punto de venta encontrado.</returns>
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

        /// <summary>
        /// Obtiene una lista de puntos de venta limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de puntos de venta.</param>
        /// <returns>La lista de puntos de venta.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Point_of_Sales> Take(int size) => _posService.Take(size);

        /// <summary>
        /// Agrega un nuevo punto de venta.
        /// </summary>
        /// <param name="new_pos">Nuevo punto de venta a agregar.</param>
        /// <returns>Estado de la operación.</returns>
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

        /// <summary>
        /// Elimina un punto de venta por su ID.
        /// </summary>
        /// <param name="pos_id">ID del punto de venta a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
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

        /// <summary>
        /// Edita un punto de venta por su ID.
        /// </summary>
        /// <param name="pos_id">ID del punto de venta a editar.</param>
        /// <param name="edited_pos">Punto de venta editado.</param>
        /// <returns>Estado de la operación.</returns>
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

        /// <summary>
        /// Obtiene todos los puntos de venta.
        /// </summary>
        /// <returns>La lista de todos los puntos de venta.</returns>
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

        /// <summary>
        /// Elimina todos los puntos de venta.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
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
}