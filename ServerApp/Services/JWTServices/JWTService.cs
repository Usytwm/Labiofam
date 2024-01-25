using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Labiofam.Models;
using Microsoft.IdentityModel.Tokens;

namespace Labiofam.Services
{
    public class JWTService : IJWTService
    {
        private readonly IConfiguration _configuration;

        public JWTService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public AuthenticationDTO CreateJsonWebToken(User user)
        {
            var expiration = DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(_configuration.GetSection("JWT")["EXPIRATION_MINUTES"])
                );

            var claims = new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()), // Subject (user_id)
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JWT_id
                new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()), // Issued at (time of token generation)
                new(ClaimTypes.NameIdentifier, user.Name!), // Unique name identifier of the user
                new(ClaimTypes.Email, user.Email!) // Email of the user
            };

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration.GetSection("JWT")["Key"]!));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenGenerator = new JwtSecurityToken(
                _configuration.GetSection("JWT")["Issuer"],
                _configuration.GetSection("JWT")["Audience"],
                claims,
                expires: expiration,
                signingCredentials: credentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenGenerator);

            return new AuthenticationDTO()
            {
                Name = user.Name,
                Email = user.Email,
                Token = token,
                ExpirationDate = expiration
            };
        }
    }
}