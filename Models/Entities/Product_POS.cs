using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Product_POS
{
    public Guid Product_ID { get; set; }
    public Guid Point_ID { get; set; }

    [JsonIgnore]
    public Point_of_Sales? Point_Of_Sales { get; set; }
    [JsonIgnore]
    public Product? Product { get; set; }
    public int Cantidad { get; set; }
}