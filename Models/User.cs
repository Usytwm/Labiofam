using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class User
{
    [Key]
    public Guid User_ID { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    [StringLength(32)]
    public string? Password { get; set; }
    public ICollection<User_Role>? Roles { get; set; }
    public ICollection<User_Product>? Products { get; set; }
}