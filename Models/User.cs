using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class User
{
    [Key]
    public readonly Guid User_ID = Guid.NewGuid();
    [StringLength(64)]
    public string? Name { get; set; }
    [StringLength(32)]
    public string? Password { get; set; }
    public ICollection<User_Role>? Roles { get; set; }
    public ICollection<User_Product>? Products { get; set; }
}