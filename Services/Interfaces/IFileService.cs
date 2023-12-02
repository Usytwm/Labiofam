namespace Labiofam.Services;

/// <summary>
/// Interface for file service.
/// </summary>
public interface IFileService
{
    /// <summary>
    /// Asynchronously saves a photo.
    /// </summary>
    /// <param name="photo">The photo to save.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task SavePhotoAsync(IFormFile photo);

    /// <summary>
    /// Asynchronously gets a photo.
    /// </summary>
    /// <param name="photoName">The name of the photo to get.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the photo as a byte array.</returns>
    Task<byte[]> GetPhotoAsync(string photoName);
}

