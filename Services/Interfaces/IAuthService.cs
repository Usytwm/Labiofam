using System.Security.Claims;
using Labiofam.Models;

namespace Labiofam.Services;

public interface IAuthService
{
    /// <summary>
    /// Validate token
    /// </summary>
    /// <param name="token">Token a validar.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    ClaimsPrincipal? ValidateToken(string token);

    /// <summary>
    /// Asynchronously gets a user.
    /// </summary>
    /// <param name="token">The token of the user to get.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the user.</returns>
    Task<RegistrationRequestModel> GetUserByToken(string token);
}
