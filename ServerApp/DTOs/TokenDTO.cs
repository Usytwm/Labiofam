using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class TokenDTO
{
    [Required]
    public string? Token { get; set; }
    [Required]
    public string? RefreshToken { get; set; }
}