namespace Labiofam.Models;

public class User_Product
{
    public Guid Product_ID { get; set; }
    public Guid User_ID { get; set; }
    public Product? Product { get; set; }
    public User? User { get; set; }
}