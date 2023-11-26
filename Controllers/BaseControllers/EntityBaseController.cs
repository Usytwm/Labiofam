using System.Linq.Expressions;
using Labiofam.Models;
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
        public async Task<IActionResult> Take(int size)
        {
            try
            {
                var result = await _entityService.TakeAsync(size);;
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Obtiene una página específica de entidades.
        /// </summary>
        /// <param name="size">Tamaño de la página.</param>
        /// <param name="page_number">Número de la página.</param>
        /// <returns>Una colección de entidades correspondiente a la página y tamaño especificados.</returns>
        [HttpGet("take/{size}/{page_number}")]
        public async Task<IActionResult> TakeRange(int size, int page_number)
        {
            try
            {
                var result = await _entityService.TakeRangeAsync(size, page_number);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
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
                var result = await _entityService.GetBySubstringAsync(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Filtra las entidades de acuerdo a una expresión lambda.
        /// No acepta atributos que no sean strings en la entidad dada.
        /// </summary>
        /// <param name="lambda_exp">Expresión con los atributos según los cuales se filtra.</param>
        /// <returns>La lista de entidades filtrada.</returns>
        [HttpPost("filterbyproperties")]
        public async Task<IActionResult> FilterByProperties(PropertiesFilterModel model)
        {
            if (model.Names is null || model.Values is null)
                throw new ArgumentNullException("All parameters must be not null");

            try
            {
                var result = await _entityService.PropertiesFilterAsync(model.Names, model.Values);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}