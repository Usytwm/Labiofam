namespace Labiofam.Models;

public class Product_POSFilterDTO
{
    public ICollection<Product>? Products { get; set; }
    public ICollection<int>? Sizes { get; set; }
}