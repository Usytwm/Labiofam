using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class EntityDTOController<T, DTO> : EntityController<T>
    {
        private readonly IEntityDTOService<T, DTO> _entityDTOService;

        protected EntityDTOController(
            IEntityService<T> entityService,
            IEntityDTOService<T, DTO> entityDTOService
            ) : base(entityService)
        {
            _entityDTOService = entityDTOService;
        }

        /// <summary>
        /// Agrega una nueva entidad utilizando un DTO.
        /// </summary>
        /// <param name="new_entity">Nuevo DTO de entidad.</param>
        /// <returns>Respuesta HTTP 200 OK si se agrega correctamente.</returns>
        [HttpPost]
        public async Task<IActionResult> Add(DTO new_entity)
        {
            try
            {
                await _entityDTOService.AddAsync(new_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Edita una entidad existente utilizando un DTO.
        /// </summary>
        /// <param name="id">ID de la entidad a editar.</param>
        /// <param name="edited_entity">DTO de entidad editado.</param>
        /// <returns>Respuesta HTTP 200 OK si se edita correctamente.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, DTO edited_entity)
        {
            try
            {
                await _entityDTOService.EditAsync(id, edited_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}