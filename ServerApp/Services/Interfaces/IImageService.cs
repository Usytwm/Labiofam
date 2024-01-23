namespace Labiofam.Services;

/// <summary>
/// Interface for file service.
/// </summary>
public interface IImageService
{
    /// <summary>
    /// Asynchronously saves a image.
    /// </summary>
    /// <param name="image">The image to save.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<string> UploadImageAsync(IFormFile image);

    /// <summary>
    /// Asynchronously gets a image.
    /// </summary>
    /// <param name="imageName">The name of the image to get.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the image as a byte array.</returns>
    Task<byte[]> GetImageAsync(string imageName);
}

