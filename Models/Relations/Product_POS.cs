using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Product_POS : IRelationModel
{
    public Guid Id1 { get; set; }
    public Guid Id2 { get; set; }

    [JsonIgnore]
    public Point_of_Sales? Point_Of_Sales { get; set; }
    [JsonIgnore]
    public Product? Product { get; set; }
    public int Cantidad { get; set; }
}