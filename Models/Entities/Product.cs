using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Product : IEntityModel
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
    public string? Description { get; set; }
    public string? Diseases { get; set; }
    public string? Advantages { get; set; }
    public string? Summary { get; set; } /////////////////////////////

    [JsonIgnore]
    public ICollection<Product_POS>? Points_Of_Sales { get; set; }
    [JsonIgnore]
    public ICollection<User_Product>? Users { get; set; }
}