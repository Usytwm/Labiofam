using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class User_Product
{
    public Guid Product_ID { get; set; }
    public Guid User_ID { get; set; }
    
    [JsonIgnore]
    public Product? Product { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
}