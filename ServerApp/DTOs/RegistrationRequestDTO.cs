using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class RegistrationRequestDTO
{
    [Required]
    public RegistrationDTO? User { get; set; }
    [Required]
    public ICollection<RoleDTO>? Roles { get; set; }
}