using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class EntityNoModelController<T> : EntityController<T>
    {
        private readonly IEntityNoModelService<T> _entityNoModelService;

        protected EntityNoModelController(
            IEntityService<T> entityService,
            IEntityNoModelService<T> entityNoModelService
            ) : base(entityService)
        {
            _entityNoModelService = entityNoModelService;
        }

        /// <summary>
        /// Agrega una nueva entidad sin utilizar un modelo.
        /// </summary>
        /// <param name="new_entity">Nueva entidad.</param>
        /// <returns>Respuesta HTTP 200 OK si se agrega correctamente.</returns>
        [HttpPost]
        public async Task<IActionResult> Add(T new_entity)
        {
            try
            {
                await _entityNoModelService.AddAsync(new_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Edita una entidad existente sin utilizar un modelo.
        /// </summary>
        /// <param name="id">ID de la entidad a editar.</param>
        /// <param name="edited_entity">Entidad editada.</param>
        /// <returns>Respuesta HTTP 200 OK si se edita correctamente.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, T edited_entity)
        {
            try
            {
                await _entityNoModelService.EditAsync(id, edited_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}