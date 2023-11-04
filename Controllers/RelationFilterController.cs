using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationFilterController : Controller
    {
        private readonly IRelationFilter _relationFilter;

        public RelationFilterController(IRelationFilter relationFilter)
        {
            _relationFilter = relationFilter;
        }

        [HttpGet("getrolesbyuser")]
        public async Task<IActionResult> GetRolesByUser(Guid user_id)
        {
            try
            {
                var result = await _relationFilter.GetRolesByUser(user_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getusersbyrole")]
        public async Task<IActionResult> GetUsersByRole(Guid role_id)
        {
            try
            {
                var result = await _relationFilter.GetUsersByRole(role_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getproductsbyuser")]
        public async Task<IActionResult> GetProductsByUser(Guid user_id)
        {
            try
            {
                var result = await _relationFilter.GetProductsByUser(user_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getusersbyproduct")]
        public async Task<IActionResult> GetUsersByProduct(Guid product_id)
        {
            try
            {
                var result = await _relationFilter.GetUsersByProduct(product_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getposbyproduct")]
        public async Task<IActionResult> GetPOSByProduct(Guid product_id)
        {
            try
            {
                var result = await _relationFilter.GetPOSByProduct(product_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getproductsbypos")]
        public async Task<IActionResult> GetProductsByPOS(Guid pos_id)
        {
            try
            {
                var result = await _relationFilter.GetProductsByPOS(pos_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}