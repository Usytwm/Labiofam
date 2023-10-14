namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class ProductService : IEntityService<Product>
{
    private readonly WebDbContext _webDbContext;
    public ProductService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Product> GetAsync(Guid product_id)
    {
        var products = _webDbContext.Products!;
        var current_product = await products.FirstOrDefaultAsync(
            product => product.Product_ID.Equals(product_id)
            );
        if (current_product is not null)
        {
            return current_product;
        }
        throw new InvalidOperationException("Product not found");
    }
    public async Task AddAsync(Product new_product)
    {
        var products = _webDbContext.Products!;
        
        if (products.Any(product => product.Name!.Equals(new_product.Name)))
            throw new InvalidOperationException("The product already exists");

        new_product.Product_ID = Guid.NewGuid();

        products.Add(new_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid product_id)
    {
        var products = _webDbContext.Products!;
        var current_product = await products.FirstOrDefaultAsync(
            product => product.Product_ID!.Equals(product_id)
            ) ?? throw new InvalidOperationException("Product not found");

        products.Remove(current_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid product_id, Product edited_Product)
    {
        var products = _webDbContext.Products!;
        var current_product = await products.FirstOrDefaultAsync(
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

    public async Task<List<Product>> GetAllAsync()
    {
        var products = await _webDbContext.Products!.ToListAsync();
        return products;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Products!);
        await _webDbContext.SaveChangesAsync();
    }
}