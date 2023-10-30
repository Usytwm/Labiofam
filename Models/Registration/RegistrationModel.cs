namespace Labiofam.Models;

public class RegistrationModel
{
    public string? Name { get; set; }
    public string? Password { get; set; }
    public string? Old_Password { get; set; }
    public string? Email { get; set; }
    public string? Email_Token { get; set; }
}