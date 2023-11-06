using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class RegistrationController<T, Model> : Controller
    {
        private readonly IRegistrationService<T, Model> _entityService;

        public RegistrationController(IRegistrationService<T, Model> entityService)
        {
            _entityService = entityService;
        }

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
        [HttpGet("take/{size}")]
        public IEnumerable<T> Take(int size) => _entityService.Take(size);
        [HttpPost]
        public async Task<IActionResult> Add(Model new_entity)
        {
            try
            {
                await _entityService.AddAsync(new_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
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
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Model edited_entity)
        {
            try
            {
                await _entityService.EditAsync(id, edited_entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
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
    }
}