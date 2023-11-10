using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    public abstract class RelationFilterController<T, T1, T2> : Controller
    {
        private readonly IRelationFilter<T, T1, T2> _relationFilter;

        public RelationFilterController(IRelationFilter<T, T1, T2> relationFilter)
        {
            _relationFilter = relationFilter;
        }

        [HttpGet("gettype2bytype1")]
        public async Task<IActionResult> GetType2ByType1(Guid type1_id)
        {
            try
            {
                var result = await _relationFilter.GetType2ByType1(type1_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("gettype1bytype2")]
        public async Task<IActionResult> GetType1ByType2(Guid type2_id)
        {
            try
            {
                var result = await _relationFilter.GetType1ByType2(type2_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("gettype2bytype1/{substring}")]
        public async Task<IActionResult> GetType2ByType1Substring(string substring)
        {
            try
            {
                var result = await _relationFilter.GetType2ByType1Substring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("gettype1bytype2/{substring}")]
        public async Task<IActionResult> GetType1ByType2Substring(string substring)
        {
            try
            {
                var result = await _relationFilter.GetType1ByType2Substring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost("addtype2bytype1")]
        public async Task<IActionResult> AddType2ByType1(
            Guid type1_id, [FromBody] ICollection<T2> entities)
        {
            try
            {
                await _relationFilter.AddType2ByType1(type1_id, entities);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost("addtype1bytype2")]
        public async Task<IActionResult> AddType1ByType2(
            Guid type1_id, [FromBody] ICollection<T1> entities)
        {
            try
            {
                await _relationFilter.AddType1ByType2(type1_id, entities);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}