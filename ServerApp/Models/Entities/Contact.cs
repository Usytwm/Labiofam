using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Contact : IEntityDTO
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    [StringLength(1024)]
    public string? Image { get; set; }
    [StringLength(32)]
    public string? Phone { get; set; }
    [StringLength(128)]
    public string? Email { get; set; }
    [StringLength(64)]
    public string? Occupation { get; set; }
}