using Labiofam.Models;

namespace Labiofam.Services;

public interface IClientService
{
    Task<Client> GetClientAsync(Guid client_id);
    Task AddClientAsync(Client new_client);
    Task RemoveClientAsync(Guid client_id);
    Task EditClientAsync(Guid client_id, Client edited_client);
    Task<List<Client>> GetAllClientsAsync();
    Task RemoveAllClientsAsync();
}