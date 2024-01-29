using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Type_Price : IEntityDTO
{
    [Key]
    public Guid Id { get; set; }
    public string? Type { get; set; }
    public double Price { get; set; }
    
    [JsonIgnore]
    public virtual Type_Product? Product { get; set; }
    [JsonIgnore]
    public string? Name { get; set; } = Guid.NewGuid().ToString();
}