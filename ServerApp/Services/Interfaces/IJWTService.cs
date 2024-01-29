using System.Security.Claims;
using Labiofam.Models;

namespace Labiofam.Services;

public interface IJWTService
{
    AuthenticationDTO CreateJsonWebToken(User user, ICollection<Role> roles);
    ClaimsPrincipal? GetPrincipalFromJWT(string token);
}