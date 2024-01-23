using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadPhoto(IFormFile photo)
        {
            try
            {
                var result = await _imageService.UploadImageAsync(photo);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Fatal error");
            }
        }
        [HttpGet("{photoUrl}")]
        public async Task<IActionResult> GetPhoto(string photoUrl)
        {
            try
            {
                var photo = await _imageService.GetImageAsync(photoUrl);
                var file = File(photo, "image/jpeg");
                return Ok(file);
            }
            catch
            {
                return BadRequest("Fatal error");
            }
        }
    }
}