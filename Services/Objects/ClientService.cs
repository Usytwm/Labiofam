namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class ClientService : IClientService
{
    private readonly WebDbContext _webDbContext;
    public ClientService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Client> GetClientAsync(Guid client_id)
    {
        var clients = _webDbContext.Clients ??
            throw new InvalidOperationException("No clients available");
        var current_client = await clients.FirstOrDefaultAsync(
            client => client.Client_ID.Equals(client_id)
            );
        if (current_client is not null)
        {
            return current_client;
        }
        throw new InvalidOperationException("Client not found");
    }
    public async Task AddClientAsync(Client new_client)
    {
        var clients = _webDbContext.Clients ??
            throw new InvalidOperationException("No clients available");
        
        if (clients.Any(client => client.Name!.Equals(new_client.Name)))
            throw new InvalidOperationException("The client already exists");

        new_client.Client_ID = Guid.NewGuid();

        clients.Add(new_client);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveClientAsync(Guid client_id)
    {
        var clients = _webDbContext.Clients ??
            throw new InvalidOperationException("No clients available");
        var current_client = await clients.FirstOrDefaultAsync(
            client => client.Client_ID!.Equals(client_id)
            ) ?? throw new InvalidOperationException("Client not found");

        clients.Remove(current_client);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditClientAsync(Guid client_id, Client edited_client)
    {
        var clients = _webDbContext.Clients ??
            throw new InvalidOperationException("No clients available");
        var current_client = await clients.FirstOrDefaultAsync(
            client => client.Client_ID!.Equals(client_id)
            ) ?? throw new InvalidOperationException("Client not found");

        current_client.Name = edited_client.Name;
        current_client.Image = edited_client.Image;

        _webDbContext.Entry(current_client).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Client>> GetAllClientsAsync()
    {
        var clients = await _webDbContext.Clients!.ToListAsync();
        return clients;
    }

    public async Task RemoveAllClientsAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Clients!);
        await _webDbContext.SaveChangesAsync();
    }
}