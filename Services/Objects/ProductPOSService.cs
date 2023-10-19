namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class ProductPOSService : IRelationService<Product_POS>
{
    private readonly WebDbContext _webDbContext;
    public ProductPOSService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Product_POS> GetAsync(Guid product_id, Guid pos_id)
    {
        var product_POS = await _webDbContext.Product_POS!.FirstOrDefaultAsync(
            ppos => ppos.Product_ID.Equals(product_id) && ppos.Point_ID.Equals(pos_id)
            ) ?? throw new InvalidOperationException("Product_POS not found");
    
        return product_POS;
    }
    public async Task AddAsync(Guid product_id, Guid pos_id)
    {
        var products = _webDbContext.Products!;
        var pos = _webDbContext.Points_Of_Sales!;
        var product_POS = _webDbContext.Product_POS!;
        try {
            var current_product_POS = await GetAsync(product_id, pos_id);
            current_product_POS.Cantidad += 1;
        } catch {
            var current_product = await products.FirstOrDefaultAsync(
                product => product.Product_ID!.Equals(product_id)
                ) ?? throw new InvalidOperationException("Product not found");
            var current_pos = await pos.FirstOrDefaultAsync(
                pos => pos.Point_ID!.Equals(pos_id)
                ) ?? throw new InvalidOperationException("Point of sales not found");

            var new_relation = new Product_POS() {
                Product_ID = product_id,
                Product = current_product,
                Point_ID = pos_id,
                Point_Of_Sales = current_pos,
                Cantidad = 1
            };
            
            product_POS.Add(new_relation);
        }
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid product_id, Guid pos_id)
    {
        var products = _webDbContext.Products!;
        var pos = _webDbContext.Points_Of_Sales!;
        var product_POS = _webDbContext.Product_POS!;
        var current_product_pos = await product_POS!.FirstOrDefaultAsync(
            ppos => ppos.Product_ID.Equals(product_id) && ppos.Point_ID.Equals(pos_id)
            ) ?? throw new InvalidOperationException("Product_POS not found");

        product_POS.Remove(current_product_pos);
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