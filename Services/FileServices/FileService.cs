
namespace Labiofam.Services;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _env;

    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }


    public async Task<byte[]> GetPhotoAsync(string photoName)
    {
        var filePath = Path.Combine(_env.WebRootPath, photoName);
        return await File.ReadAllBytesAsync(filePath);
    }

    public async Task SavePhotoAsync(IFormFile photo)
    {
        var filePath = Path.Combine(_env.WebRootPath, photo.FileName);
        using var stream = new FileStream(filePath, FileMode.Create);
        await photo.CopyToAsync(stream);
    }
}