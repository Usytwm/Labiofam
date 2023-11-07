using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Contact : IEntityModel
{
    [Key]
    public Guid Contact_ID { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
    [StringLength(256)]
    public string? Contact_Info { get; set; }
    [StringLength(64)]
    public string? Occupation { get; set; }
}