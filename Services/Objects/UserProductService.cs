namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class UserProductService : IRelationService<User_Product>
{
    private readonly WebDbContext _webDbContext;
    public UserProductService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<User_Product> GetAsync(Guid user_id, Guid product_id)
    {
        var user_product = await _webDbContext.User_Product!.FirstOrDefaultAsync(
            up => up.User_ID.Equals(user_id) && up.Product_ID.Equals(product_id)
            ) ?? throw new InvalidOperationException("User_Product not found");
    
        return user_product;
    }
    public async Task AddAsync(Guid user_id, Guid product_id)
    {
        var users = _webDbContext.Users!;
        var products = _webDbContext.Products!;
        var user_product = _webDbContext.User_Product!;
        if (user_product.Any(up => up.User_ID!.Equals(user_id) &&
            up.Product_ID.Equals(product_id)))
            throw new InvalidOperationException("The User_Product already exists");
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");
        var current_product = await products.FirstOrDefaultAsync(
            product => product.Product_ID!.Equals(product_id)
            ) ?? throw new InvalidOperationException("Product not found");

        var new_relation = new User_Product() {
            User_ID = user_id,
            User = current_user,
            Product_ID = product_id,
            Product = current_product
        };
        
        current_user.Products ??= new List<User_Product>();
        current_user.Products.Add(new_relation);
        current_product.Users ??= new List<User_Product>();
        current_product.Users.Add(new_relation);
        user_product.Add(new_relation);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid user_id, Guid product_id)
    {
        var users = _webDbContext.Users!;
        var products = _webDbContext.Products!;
        var user_product = _webDbContext.User_Product!;
        var current_user_product = await user_product!.FirstOrDefaultAsync(
            up => up.User_ID.Equals(user_id) && up.Product_ID.Equals(product_id)
            ) ?? throw new InvalidOperationException("User_Product not found");

        user_product.Remove(current_user_product);
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