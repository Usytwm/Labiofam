using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class EntityModelController<T, Model>
        : EntityController<T>
    {
        private readonly IEntityModelService<T, Model> _entityModelService;

        protected EntityModelController(
            IEntityService<T> entityService,
            IEntityModelService<T, Model> entityModelService
            ) : base(entityService)
        {
            _entityModelService = entityModelService;
        }

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