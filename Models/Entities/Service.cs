using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Service : IEntityModel
{
    [Key]
    public Guid Service_ID { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Info { get; set; }
}