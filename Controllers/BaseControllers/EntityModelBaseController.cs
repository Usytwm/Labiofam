using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class EntityModelController<T, Model> : EntityController<T>
    {
        private readonly IEntityModelService<T, Model> _entityModelService;

        protected EntityModelController(
            IEntityService<T> entityService,
            IEntityModelService<T, Model> entityModelService
            ) : base(entityService)
        {
            _entityModelService = entityModelService;
        }

        /// <summary>
        /// Agrega una nueva entidad utilizando un modelo.
        /// </summary>
        /// <param name="new_entity">Nuevo modelo de entidad.</param>
        /// <returns>Respuesta HTTP 200 OK si se agrega correctamente.</returns>
        [HttpPost]
        public async Task<IActionResult> Add(Model new_entity)
        {
            try
            {
                await _entityModelService.AddAsync(new_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Edita una entidad existente utilizando un modelo.
        /// </summary>
        /// <param name="id">ID de la entidad a editar.</param>
        /// <param name="edited_entity">Modelo de entidad editado.</param>
        /// <returns>Respuesta HTTP 200 OK si se edita correctamente.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Model edited_entity)
        {
            try
            {
                await _entityModelService.EditAsync(id, edited_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}