using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class ProductService : IEntityService<Product>
{
    private readonly WebDbContext _webDbContext;
    public ProductService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Product> GetAsync(Guid product_id)
    {
        var current_product = await _webDbContext.FindAsync<Product>(product_id)
            ?? throw new InvalidOperationException("Product not found");

        return current_product;
    }
    public async Task<Product> GetAsync(string product_name)
    {
        var current_product = await _webDbContext.Products!.FirstOrDefaultAsync(
            x => x.Name!.Equals(product_name)
            ) ?? throw new InvalidOperationException("Product not found");

        return current_product;
    }

    public IEnumerable<Product> Take(int size) =>
        _webDbContext.Products!.OrderBy(x => x.Name).Take(size);

    public async Task AddAsync(Product new_product)
    {
        if (await _webDbContext.Products!.AnyAsync(product => product.Name!.Equals(new_product.Name)))
            throw new InvalidOperationException("The product already exists");

        await _webDbContext.AddAsync(new_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid product_id)
    {
        var current_product = await GetAsync(product_id);

        _webDbContext.Remove(current_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid product_id, Product edited_Product)
    {
        var current_product = await GetAsync(product_id);

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