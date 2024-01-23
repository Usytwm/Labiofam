using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class RegistrationDTO
{
    [Required(ErrorMessage = "Name can't be blank")]
    public string? Name { get; set; }
    [Required(ErrorMessage = "Password can't be blank")]
    public string? Password { get; set; }
    [Required(ErrorMessage = "Confirm_Password can't be blank")]
    [Compare(nameof(Password), ErrorMessage = "Passwords don't match")]
    public string? Confirm_Password { get; set; }
    [Required(ErrorMessage = "Email can't be blank")]
    [EmailAddress(ErrorMessage = "Invalid email")] //esto se valida rigurosamente en el servicio de user 
    public string? Email { get; set; }
    public string? Email_Token { get; set; }
    public string? Phone { get; set; }
    public string? Image { get; set; }
}