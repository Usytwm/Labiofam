using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchFilterController : Controller
    {
        private readonly ISearchFilter _searchFilter;

        public SearchFilterController(ISearchFilter searchFilter)
        {
            _searchFilter = searchFilter;
        }

        #region Simple_GetBySubstring
        [HttpGet("getclients/{substring}")]
        public async Task<IActionResult> GetClientsBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetClientsBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getcontacts/{substring}")]
        public async Task<IActionResult> GetContactsBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetContactsBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getposs/{substring}")]
        public async Task<IActionResult> GetPOSBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetPOSBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getproducts/{substring}")]
        public async Task<IActionResult> GetProductsBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetProductsBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getroles/{substring}")]
        public async Task<IActionResult> GetRolesBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetRolesBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getservices/{substring}")]
        public async Task<IActionResult> GetServicesBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetServicesBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getusers/{substring}")]
        public async Task<IActionResult> GetUsersBySubstring(string substring)
        {
            try
            {
                var result = await _searchFilter.GetUsersBySubstring(substring);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        #endregion

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
    }
}