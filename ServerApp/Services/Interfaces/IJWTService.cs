using Labiofam.Models;

namespace Labiofam.Services;

public interface IJWTService
{
    AuthenticationDTO CreateJsonWebToken(User user);
}