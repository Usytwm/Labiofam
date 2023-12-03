using System.Security.Claims;
using Labiofam.Models;

namespace Labiofam.Services
{
    /// <summary>
    /// Interfaz para el servicio de autenticación.
    /// </summary>
    public interface IAuthService
    {
        /// <summary>
        /// Valida un token JWT.
        /// </summary>
        /// <param name="token">El token JWT a validar.</param>
        /// <returns>Un ClaimsPrincipal si el token es válido, null en caso contrario.</returns>
        ClaimsPrincipal? ValidateToken(string token);

        /// <summary>
        /// Obtiene de forma asíncrona los datos de un usuario a partir de un token.
        /// </summary>
        /// <param name="token">El token del usuario a obtener.</param>
        /// <returns>Un Task que contiene el modelo de solicitud de registro del usuario.</returns>
        Task<RegistrationRequestModel> GetDataByToken(string token);

        /// <summary>
        /// Genera un token JWT.
        /// </summary>
        /// <param name="claims">Una lista de Claim para incluir en el token.</param>
        /// <param name="expire">La fecha y hora en que el token debe expirar.</param>
        /// <returns>Un token JWT como una cadena de texto.</returns>
        string GenerateToken(List<Claim> claims, DateTime expire);
    }
}
