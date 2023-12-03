
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Labiofam.Models;
using Microsoft.IdentityModel.Tokens;

namespace Labiofam.Services;

public class AuthService : IAuthService
{

    private readonly IConfiguration _configuration;
    private readonly IEntityService<User> _userService;

    private readonly IRelationFilter<User_Role, User, Role> _relationFilter;

    public AuthService(IConfiguration configuration, IEntityService<User> userService, IRelationFilter<User_Role, User, Role> relationFilter)
    {
        _configuration = configuration;
        _userService = userService;
        _relationFilter = relationFilter;
    }

    public async Task<RegistrationRequestModel> GetUserByToken(string token)
    {
        var principal = ValidateToken(token);
        if (principal == null)
        {
            throw new ArgumentException("Token inválido o expirado");
        }

        var userId = principal.Claims.First(c => c.Type == ClaimTypes.Sid).Value;

        var user = await _userService.GetAsync(Guid.Parse(userId));
        var roles = await _relationFilter.GetType2ByType1Async(user.Id);

        RegistrationRequestModel userModel = new()
        {
            User = new RegistrationModel()
            {
                Email = user.Email,
                Name = user.Name,
                Password = user.PasswordHash,
            },
            Role = new RoleModel()
            {
                Name = roles.First().Name,
                Description = roles.First().Description
            }
        };
        return userModel;
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = _configuration["Jwt:Audience"],
            ClockSkew = TimeSpan.Zero
        };

        try
        {
            var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            return principal;
        }
        catch (Exception)
        {
            return null;
        }
    }

}
