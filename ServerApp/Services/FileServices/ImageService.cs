namespace Labiofam.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _environment;

        public ImageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(_environment.ContentRootPath, "ImagesRepository", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }
        public async Task<byte[]> GetImageAsync(string fileName)
        {
            var filePath = Path.Combine(_environment.ContentRootPath, "ImagesRepository", fileName);
            
            return await File.ReadAllBytesAsync(filePath);
        }
    }
}