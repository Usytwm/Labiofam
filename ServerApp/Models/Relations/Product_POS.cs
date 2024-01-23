using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Product_POS : IRelationDTO
{
    public Guid Id1 { get; set; }
    public Guid Id2 { get; set; }

    [JsonIgnore]
    public virtual Point_of_Sales? Point_Of_Sales { get; set; }
    [JsonIgnore]
    public virtual Product? Product { get; set; }
    public int Cantidad { get; set; }
}