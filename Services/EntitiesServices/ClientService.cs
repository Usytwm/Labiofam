using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class ClientService : IEntityService<Client>
{
    private readonly WebDbContext _webDbContext;
    public ClientService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Client> GetAsync(Guid client_id)
    {
        var current_client = await _webDbContext.FindAsync<Client>(client_id)
            ?? throw new InvalidOperationException("Client not found");

        return current_client;
    }

    public async Task<Client> GetAsync(string client_name)
    {
        var current_client = await _webDbContext.Clients!.FirstOrDefaultAsync(
            x => x.Name!.Equals(client_name)
            ) ?? throw new InvalidOperationException("Client not found");

        return current_client;
    }

    public IEnumerable<Client> Take(int size) =>
        _webDbContext.Clients!.OrderBy(x => x.Name).Take(size);

    public async Task AddAsync(Client new_client)
    {
        if (await _webDbContext.Clients!.AnyAsync(client => client.Name!.Equals(new_client.Name)))
            throw new InvalidOperationException("The client already exists");

        await _webDbContext.AddAsync(new_client);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid client_id)
    {
        var current_client = await GetAsync(client_id);

        _webDbContext.Remove(current_client);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid client_id, Client edited_client)
    {
        var current_client = await GetAsync(client_id);

        current_client.Name = edited_client.Name;
        current_client.Image = edited_client.Image;

        _webDbContext.Entry(current_client).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Client>> GetAllAsync()
    {
        var clients = await _webDbContext.Clients!.ToListAsync();
        return clients;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Clients!);
        await _webDbContext.SaveChangesAsync();
    }
}