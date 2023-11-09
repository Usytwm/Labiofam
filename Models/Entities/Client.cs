using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Client : IEntityModel
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
}