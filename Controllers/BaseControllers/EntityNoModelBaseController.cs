using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class EntityNoModelController<T>
        : EntityController<T>
    {
        private readonly IEntityNoModelService<T> _entityNoModelService;

        protected EntityNoModelController(
            IEntityService<T> entityService,
            IEntityNoModelService<T> entityNoModelService
            ) : base(entityService)
        {
            _entityNoModelService = entityNoModelService;
        }

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