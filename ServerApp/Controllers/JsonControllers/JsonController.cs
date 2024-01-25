using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class JsonController : ControllerBase
    {
        private readonly IJsonService _jsonService;

        public JsonController(IJsonService jsonService)
        {
            _jsonService = jsonService;
        }

        [HttpPost("jsonreader")]
        public IActionResult JsonReader()
        {
            try
            {
                var result = _jsonService.JsonReader();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}