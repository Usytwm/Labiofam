using Labiofam.Models;

namespace Labiofam.Services;

public interface IProductService
{
    Task<Product> GetProductAsync(Guid product_id);
    Task AddProductAsync(Product new_product);
    Task RemoveProductAsync(Guid product_id);
    Task EditProductAsync(Guid product_id, Product edited_product);
    Task<List<Product>> GetAllProductsAsync();
    Task RemoveAllProductsAsync();
}