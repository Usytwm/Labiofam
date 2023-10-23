using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class UserProductService : IRelationService<User_Product>
{
    private readonly WebDbContext _webDbContext;
    public UserProductService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<User_Product> GetAsync(Guid user_id, Guid product_id)
    {
        var user_product = await _webDbContext.User_Product!.FirstOrDefaultAsync(
            x => x.User_ID.Equals(user_id) && x.Product_ID.Equals(product_id)
            ) ?? throw new InvalidOperationException("User_Product not found");

        return user_product;
    }

    public IEnumerable<User_Product> Take(int size) =>
        _webDbContext.User_Product!.Take(size);

    public async Task AddAsync(Guid user_id, Guid product_id)
    {
        try
        {
            await GetAsync(user_id, product_id);
            throw new InvalidOperationException("The User_Product already exists");
        }
        catch 
        { 
            await _webDbContext.AddAsync(new User_Product()
            {
                User_ID = user_id,
                Product_ID = product_id
            });
            await _webDbContext.SaveChangesAsync();
        }
    }

    public async Task RemoveAsync(Guid user_id, Guid product_id)
    {
        var current_user_product = await GetAsync(user_id, product_id);

        _webDbContext.Remove(current_user_product);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<User_Product>> GetAllAsync()
    {
        var user_product = await _webDbContext.User_Product!.ToListAsync();
        return user_product;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.User_Product!);
        await _webDbContext.SaveChangesAsync();
    }
}