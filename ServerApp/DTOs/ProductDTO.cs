using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

public class ProductDTO
{
    [Required]
    public Product? Product { get; set; }
    [Required]
    public ICollection<Type_Price>? Types { get; set; }
}