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
                Convert.ToDouble(_configuration["JWT: EXPIRATION_MINUTES"])
                );

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), // Subject (user_id)
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JWT_id
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()), // Issued at (time of token generation)
                new Claim(ClaimTypes.NameIdentifier, user.Name!), // Unique name identifier of the user
                new Claim(ClaimTypes.Email, user.Email!) // Email of the user
            };

            var protected_key = _configuration.GetSection("JWT")["Key"];
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(protected_key!));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenGenerator = new JwtSecurityToken(
                _configuration["JWT: Issuer"],
                _configuration["JWT: Audience"],
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