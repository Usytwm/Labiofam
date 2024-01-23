using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Service : IEntityDTO
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    [StringLength(2048)]
    public string? Info { get; set; }
    [StringLength(1024)]
    public string? Image { get; set; }
}