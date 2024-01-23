using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class User_Product : IRelationDTO
{
    public Guid Id1 { get; set; }
    public Guid Id2 { get; set; }
    
    [JsonIgnore]
    public virtual Product? Product { get; set; }
    [JsonIgnore]
    public virtual User? User { get; set; }
}