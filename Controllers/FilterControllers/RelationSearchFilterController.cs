using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationSearchFilterController : Controller
    {
        private readonly IRelationSearchFilter _searchFilter;

        public RelationSearchFilterController(IRelationSearchFilter searchFilter)
        {
            _searchFilter = searchFilter;
        }

        [HttpGet("getpossbyproduct/{substring}")]
        public async Task<IActionResult> GetPOSByProductSubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetPOSByProductSubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getproductsbypos/{substring}")]
        public async Task<IActionResult> GetProductsByPOSSubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetProductsByPOSSubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}