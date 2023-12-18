
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Labiofam.Models;
using Microsoft.IdentityModel.Tokens;

namespace Labiofam.Services;

/// <summary>
/// Servicio de autenticación que implementa la interfaz IAuthService.
/// </summary>
public class AuthService : IAuthService
{

    private readonly IConfiguration _configuration;
    private readonly IEntityService<User> _userService;

    private readonly IRelationFilter<User_Role, User, Role> _relationFilter;

    /// <summary>
    /// Constructor de AuthService.
    /// </summary>
    /// <param name="configuration">Interfaz de configuración.</param>
    /// <param name="userService">Servicio de entidad de usuario.</param>
    /// <param name="relationFilter">Filtro de relación.</param>
    public AuthService(IConfiguration configuration, IEntityService<User> userService, IRelationFilter<User_Role, User, Role> relationFilter)
    {
        _configuration = configuration;
        _userService = userService;
        _relationFilter = relationFilter;
    }


    /// <summary>
    /// Obtiene de forma asíncrona los datos de un usuario a partir de un token.
    /// </summary>
    /// <param name="token">El token del usuario a obtener.</param>
    /// <returns>Un Task que contiene el modelo de solicitud de registro del usuario.</returns>
    public async Task<RegistrationRequestModel> GetDataByToken(string token)
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

    /// <summary>
    /// Valida un token JWT.
    /// </summary>
    /// <param name="token">El token JWT a validar.</param>
    /// <returns>Un ClaimsPrincipal si el token es válido, null en caso contrario.</returns>
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

    /// <summary>
    /// Genera un token JWT.
    /// </summary>
    /// <param name="claims">Una lista de Claim para incluir en el token.</param>
    /// <param name="expire">La fecha y hora en que el token debe expirar.</param>
    /// <returns>Un token JWT como una cadena de texto.</returns>
    public string GenerateToken(List<Claim> claims, DateTime expire)
    {
        // Crear un nuevo token.
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
            );
        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256Signature
            );

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expire,
            signingCredentials: credentials
            );
        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);


    }
}
