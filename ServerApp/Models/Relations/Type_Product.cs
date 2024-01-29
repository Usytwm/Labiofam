using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Type_Product : IRelationDTO
{
    public Guid Id1 { get; set; }
    public Guid Id2 { get; set; }
    
    [JsonIgnore]
    public virtual Type_Price? Type_Price { get; set; }
    [JsonIgnore]
    public virtual Product? Product { get; set; }
}