using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class User_Product : IRelationModel
{
    public Guid Id1 { get; set; }
    public Guid Id2 { get; set; }
    
    [JsonIgnore]
    public Product? Product { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
}