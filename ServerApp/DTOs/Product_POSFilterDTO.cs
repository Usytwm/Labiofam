using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class Product_POSFilterDTO
{
    [Required]
    public ICollection<Product>? Products { get; set; }
    [Required]
    public ICollection<int>? Sizes { get; set; }
}