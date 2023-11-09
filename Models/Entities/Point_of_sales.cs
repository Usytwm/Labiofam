using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Point_of_Sales : IEntityModel
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
    [StringLength(128)]
    public string? Address { get; set; }
    [StringLength(32)]
    public string? Municipality { get; set; }
    [StringLength(32)]
    public string? Province { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    [JsonIgnore]
    public ICollection<Product_POS>? Available_Products { get; set; }
}