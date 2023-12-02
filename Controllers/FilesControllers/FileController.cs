using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class FileController : ControllerBase
{
    private readonly IFileService _fileService;

    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost]
    public async Task<IActionResult> UploadPhoto(IFormFile photo)
    {
        await _fileService.SavePhotoAsync(photo);
        return Ok(photo.FileName);
    }

    [HttpGet("{photoName}")]
    public async Task<IActionResult> GetPhoto(string photoName)
    {
        var photo = await _fileService.GetPhotoAsync(photoName);
        var file = File(photo, "image/jpeg");
        return file;
    }
}
