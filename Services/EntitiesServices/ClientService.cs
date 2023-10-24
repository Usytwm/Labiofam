using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ClientService : IEntityService<Client>
    {
        private readonly WebDbContext _webDbContext;

        public ClientService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente.</param>
        /// <returns>El cliente encontrado.</returns>
        public async Task<Client> GetAsync(Guid client_id)
        {
            var current_client = await _webDbContext.FindAsync<Client>(client_id)
                ?? throw new InvalidOperationException("Cliente no encontrado");
            return current_client;
        }

        /// <summary>
        /// Obtiene un cliente por su nombre.
        /// </summary>
        /// <param name="client_name">Nombre del cliente.</param>
        /// <returns>El cliente encontrado.</returns>
        public async Task<Client> GetAsync(string client_name)
        {
            var current_client = await _webDbContext.Clients!.FirstOrDefaultAsync(
                x => x.Name!.Equals(client_name)
            ) ?? throw new InvalidOperationException("Cliente no encontrado");
            return current_client;
        }

        /// <summary>
        /// Obtiene una lista de clientes limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de clientes.</param>
        /// <returns>La lista de clientes.</returns>
        public IEnumerable<Client> Take(int size) =>
            _webDbContext.Clients!.OrderBy(x => x.Name).Take(size);

        /// <summary>
        /// Agrega un nuevo cliente.
        /// </summary>
        /// <param name="new_client">Nuevo cliente a agregar.</param>
        public async Task AddAsync(Client new_client)
        {
            if (await _webDbContext.Clients!.AnyAsync(client => client.Name!.Equals(new_client.Name)))
                throw new InvalidOperationException("El cliente ya existe");

            await _webDbContext.AddAsync(new_client);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente a eliminar.</param>
        public async Task RemoveAsync(Guid client_id)
        {
            var current_client = await GetAsync(client_id);
            _webDbContext.Remove(current_client);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Edita un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente a editar.</param>
        /// <param name="edited_client">Cliente editado.</param>
        public async Task EditAsync(Guid client_id, Client edited_client)
        {
            var current_client = await GetAsync(client_id);
            current_client.Name = edited_client.Name;
            current_client.Image = edited_client.Image;
            _webDbContext.Entry(current_client).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene todos los clientes.
        /// </summary>
        /// <returns>La lista de todos los clientes.</returns>
        public async Task<List<Client>> GetAllAsync()
        {
            var clients = await _webDbContext.Clients!.ToListAsync();
            return clients;
        }

        /// <summary>
        /// Elimina todos los clientes.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Clients!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}