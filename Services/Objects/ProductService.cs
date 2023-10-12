namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class ProductService : IProductService
{
    private readonly WebDbContext _webDbContext;
    public ProductService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Product> GetProductAsync(Guid product_id)
    {
        var products = _webDbContext.Products ??
            throw new InvalidOperationException("No products available");
        var current_product = await products.FirstOrDefaultAsync(
            product => product.Product_ID.Equals(product_id)
            );
        if (current_product is not null)
        {
            return current_product;
        }
        throw new InvalidOperationException("Product not found");
    }
    public async Task AddProductAsync(Product new_product)
    {
        var products = _webDbContext.Products ??
            throw new InvalidOperationException("No products available");
        
        if (products.Any(product => product.Name!.Equals(new_product.Name)))
            throw new InvalidOperationException("The product already exists");

        new_product.Product_ID = Guid.NewGuid();

        products.Add(new_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveProductAsync(Guid product_id)
    {
        var products = _webDbContext.Products ??
            throw new InvalidOperationException("No Products available");
        var current_product = await products.FirstOrDefaultAsync(
            product => product.Product_ID!.Equals(product_id)
            ) ?? throw new InvalidOperationException("Product not found");

        products.Remove(current_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditProductAsync(Guid product_id, Product edited_Product)
    {
        var Products = _webDbContext.Products ??
            throw new InvalidOperationException("No Products available");
        var current_product = await Products.FirstOrDefaultAsync(
            product => product.Product_ID!.Equals(product_id)
            ) ?? throw new InvalidOperationException("Product not found");

        current_product.Name = edited_Product.Name;
        current_product.Type = edited_Product.Type;
        current_product.Image = edited_Product.Image;
        current_product.Summary = edited_Product.Summary;
        current_product.Specifications = edited_Product.Specifications;

        _webDbContext.Entry(current_product).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Product>> GetAllProductsAsync()
    {
        var products = await _webDbContext.Products!.ToListAsync();
        return products;
    }

    public async Task RemoveAllProductsAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Products!);
        await _webDbContext.SaveChangesAsync();
    }
}