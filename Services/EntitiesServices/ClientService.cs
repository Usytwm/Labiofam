using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ClientService : EntityNoModelService<Client>,
        IEntityService<Client>, IEntityNoModelService<Client>
    {
        private readonly WebDbContext _webDbContext;

        public ClientService(WebDbContext webDbContext)
            : base(webDbContext)
        { 
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Edita un cliente por su ID.
        /// </summary>
        /// <param name="client_id">ID del cliente a editar.</param>
        /// <param name="edited_client">Cliente editado.</param>
        public override async Task EditAsync(Guid client_id, Client edited_client)
        {
            var current_client = await GetAsync(client_id);
            current_client.Name = edited_client.Name;
            current_client.Image = edited_client.Image;
            _webDbContext.Entry(current_client).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }
    }
}