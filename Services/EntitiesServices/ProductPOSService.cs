using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class ProductPOSService : IRelationService<Product_POS>
{
    private readonly WebDbContext _webDbContext;
    public ProductPOSService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Product_POS> GetAsync(Guid product_id, Guid pos_id)
    {
        var product_POS = await _webDbContext.Product_POS!.FirstOrDefaultAsync(
            x => x.Product_ID.Equals(product_id) && x.Point_ID.Equals(pos_id)
            ) ?? throw new InvalidOperationException("Product_POS not found");

        return product_POS;
    }

    public IEnumerable<Product_POS> Take(int size) =>
        _webDbContext.Product_POS!.Take(size);

    public async Task AddAsync(Guid product_id, Guid pos_id)
    {
        try
        {
            var current_product_POS = await GetAsync(product_id, pos_id);
            current_product_POS.Cantidad += 1;
        }
        catch
        {
            await _webDbContext.AddAsync(new Product_POS()
            {
                Product_ID = product_id,
                Point_ID = pos_id,
                Cantidad = 1
            });
        }
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid product_id, Guid pos_id)
    {
        var current_product_pos = await GetAsync(product_id, pos_id);

        _webDbContext.Remove(current_product_pos);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Product_POS>> GetAllAsync()
    {
        var product_POS = await _webDbContext.Product_POS!.ToListAsync();
        return product_POS;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Product_POS!);
        await _webDbContext.SaveChangesAsync();
    }
}