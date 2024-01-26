namespace Labiofam.Models;

public class AuthenticationDTO
{
    public string? Name { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? Token { get; set; } = string.Empty;
    public DateTime ExpirationDate { get; set; }
    public string? RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpirationDate { get; set; }
}