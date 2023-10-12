using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Role
{
    [Key]
    public Guid Role_ID { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Description { get; set; }
    public ICollection<User_Role>? Users { get; set; }
}