using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class SearchFilterService : ISearchFilter
{
    private readonly WebDbContext _webDbContext;

    public SearchFilterService(WebDbContext webDbContext)
    {
        _webDbContext = webDbContext;
    }

    public async Task<List<Client>> GetClientsBySubstring(string substring)
    {
        var clients = await _webDbContext.Clients!
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return clients;
    }

    public async Task<List<Contact>> GetContactsBySubstring(string substring)
    {
        var contacts = await _webDbContext.Contacts!
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return contacts;
    }

    public async Task<List<Point_of_Sales>> GetPOSBySubstring(string substring)
    {
        var poss = await _webDbContext.Points_Of_Sales!
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return poss;
    }

    public async Task<List<Product>> GetProductsBySubstring(string substring)
    {
        var products = await _webDbContext.Products!
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return products;
    }

    public async Task<List<Role>> GetRolesBySubstring(string substring)
    {
        var roles = await _webDbContext.Roles!
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return roles;
    }

    public async Task<List<Service>> GetServicesBySubstring(string substring)
    {
        var services = await _webDbContext.Services!
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return services;
    }

    public async Task<List<User>> GetUsersBySubstring(string substring)
    {
        var users = await _webDbContext.Users!
            .Where(x => x.UserName!.Contains(substring))
            .ToListAsync();
        return users;
    }

    public async Task<List<Point_of_Sales>> GetPOSByProductSubstring(string substring)
    {
        var products = await GetProductsBySubstring(substring);
        
        var result = new List<Point_of_Sales>();
        foreach(var product in products)
        {
            var products_pos = await _webDbContext.Product_POS!
                .Where(x => x.Product_ID == product.Product_ID)
                .ToListAsync();
            
            foreach (var ppos in products_pos)
            {
                if (result.Any(x => x.Point_ID == ppos.Point_ID))
                    continue;
                
                result.Add(await _webDbContext.FindAsync<Point_of_Sales>(ppos.Point_ID)
                    ?? throw new NullReferenceException());
            }
        }
        return result;
    }


}