using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Product_POS
{
    public Guid Product_ID { get; set; }
    public Guid Point_ID { get; set; }
    public Point_of_Sales? Point_Of_Sales { get; set; }
    public Product? Product { get; set; }
    public int Cantidad { get; set; }
}