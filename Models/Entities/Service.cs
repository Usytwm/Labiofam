using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Service : IEntityModel
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Info { get; set; }

    public string? image { get; set; }
}