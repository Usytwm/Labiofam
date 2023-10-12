using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Client
{
    [Key]
    public Guid Client_ID { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
}