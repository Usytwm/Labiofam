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
}