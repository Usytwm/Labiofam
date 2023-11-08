using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Product
{
    [Key]
    public Guid Product_ID { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
    [StringLength(32)]
    public string? Type { get; set; }
    public string? Summary { get; set; }
    public string? Specifications { get; set; }

    [JsonIgnore]
    public ICollection<Product_POS>? Points_Of_Sales { get; set; }
    [JsonIgnore]
    public ICollection<User_Product>? Users { get; set; }
}