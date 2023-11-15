using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class EntityController<T> : Controller
    {
        private readonly IEntityService<T> _entityService;

        public EntityController(IEntityService<T> entityService)
        {
            _entityService = entityService;
        }

        /// <summary>
        /// Obtiene una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad.</param>
        /// <returns>La entidad correspondiente al ID proporcionado.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var entity = await _entityService.GetAsync(id);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Obtiene una entidad por su nombre.
        /// </summary>
        /// <param name="name">Nombre de la entidad.</param>
        /// <returns>La entidad correspondiente al nombre proporcionado.</returns>
        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            try
            {
                var entity = await _entityService.GetAsync(name);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Obtiene una cantidad específica de entidades.
        /// </summary>
        /// <param name="size">Tamaño de la colección de entidades.</param>
        /// <returns>Una colección de entidades de tamaño especificado.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<T> Take(int size) => _entityService.Take(size);
        /// <summary>
        /// Obtiene una página específica de entidades.
        /// </summary>
        /// <param name="size">Tamaño de la página.</param>
        /// <param name="page_number">Número de la página.</param>
        /// <returns>Una colección de entidades correspondiente a la página y tamaño especificados.</returns>
        [HttpGet("take/{size}/{page_number}")]
        public IEnumerable<T> TakeRange(int size, int page_number) =>
            _entityService.TakeRange(size, page_number);

        /// <summary>
        /// Elimina una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad a eliminar.</param>
        /// <returns>Respuesta HTTP 200 OK si se elimina correctamente.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id)
        {
            try
            {
                await _entityService.RemoveAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Obtiene todas las entidades.
        /// </summary>
        /// <returns>Todas las entidades.</returns>
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var entitys = await _entityService.GetAllAsync();
                return Ok(entitys);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Elimina todas las entidades.
        /// </summary>
        /// <returns>Respuesta HTTP 200 OK si se eliminan correctamente.</returns>
        [HttpDelete("all")]
        public async Task<IActionResult> RemoveAll()
        {
            try
            {
                await _entityService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Obtiene entidades que contienen una subcadena específica.
        /// </summary>
        /// <param name="substring">Subcadena a buscar en las entidades.</param>
        /// <returns>Entidades que contienen la subcadena especificada.</returns>
        [HttpGet("getbysubstring/{substring}")]
        public async Task<IActionResult> GetBySubstring(string substring)
        {
            try
            {
                var result = await _entityService.GetBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}