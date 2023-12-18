using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Contact : IEntityModel
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
    [StringLength(256)]

    public string? Phone { get; set; }

    public string? Email { get; set; }

    [StringLength(64)]
    public string? Occupation { get; set; }
}