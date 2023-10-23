using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class Role : IdentityRole<Guid>
{
    public string? Description { get; set; }
    public ICollection<User_Role>? Users { get; set; }
}