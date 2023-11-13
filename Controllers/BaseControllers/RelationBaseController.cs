using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class RelationController<T> : Controller
    {
        private readonly IRelationService<T> _relationService;

        public RelationController(IRelationService<T> relationService)
        {
            _relationService = relationService;
        }

        [HttpGet("{id1}/{id2}")]
        public async Task<IActionResult> Get(Guid id1, Guid id2)
        {
            try
            {
                var relation = await _relationService.GetAsync(id1, id2);
                return Ok(relation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("take/{size}")]
        public IEnumerable<T> Take(int size) => _relationService.Take(size);
        [HttpPost("{id1}/{id2}")]
        public virtual async Task<IActionResult> Add(Guid id1, Guid id2)
        {
            try
            {
                await _relationService.AddAsync(id1, id2);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("{id1}/{id2}")]
        public async Task<IActionResult> Remove(Guid id1, Guid id2)
        {
            try
            {
                await _relationService.RemoveAsync(id1, id2);
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
                var relation = await _relationService.GetAllAsync();
                return Ok(relation);
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
                await _relationService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}