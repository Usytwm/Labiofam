using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ServiceService : IEntityService<Service>
    {
        private readonly WebDbContext _webDbContext;

        public ServiceService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene un servicio por su identificador único.
        /// </summary>
        /// <param name="service_id">Identificador único del servicio.</param>
        /// <returns>El servicio encontrado.</returns>
        public async Task<Service> GetAsync(Guid service_id)
        {
            var current_service = await _webDbContext.FindAsync<Service>(service_id)
                ?? throw new InvalidOperationException("Service not found");
            return current_service;
        }

        /// <summary>
        /// Obtiene un servicio por su nombre.
        /// </summary>
        /// <param name="service_name">Nombre del servicio.</param>
        /// <returns>El servicio encontrado.</returns>
        public async Task<Service> GetAsync(string service_name)
        {
            var current_service = await _webDbContext.Services!.FirstOrDefaultAsync(
                x => x.Name!.Equals(service_name)
            ) ?? throw new InvalidOperationException("Service not found");
            return current_service;
        }

        /// <summary>
        /// Obtiene una lista de servicios ordenados alfabéticamente y limitados por un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño máximo de la lista.</param>
        /// <returns>La lista de servicios.</returns>
        public IEnumerable<Service> Take(int size) =>
            _webDbContext.Services!.OrderBy(x => x.Name).Take(size);

        /// <summary>
        /// Agrega un nuevo servicio.
        /// </summary>
        /// <param name="new_service">El nuevo servicio a agregar.</param>
        public async Task AddAsync(Service new_service)
        {
            if (await _webDbContext.Services!.AnyAsync(service => service.Name!.Equals(new_service.Name)))
                throw new InvalidOperationException("The service already exists");

            await _webDbContext.AddAsync(new_service);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina un servicio por su identificador único.
        /// </summary>
        /// <param name="service_id">Identificador único del servicio a eliminar.</param>
        public async Task RemoveAsync(Guid service_id)
        {
            var current_service = await GetAsync(service_id);
            _webDbContext.Remove(current_service);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Edita un servicio por su identificador único.
        /// </summary>
        /// <param name="service_id">Identificador único del servicio a editar.</param>
        /// <param name="edited_service">El servicio editado.</param>
        public async Task EditAsync(Guid service_id, Service edited_service)
        {
            var current_service = await GetAsync(service_id);
            current_service.Name = edited_service.Name;
            current_service.Info = edited_service.Info;
            _webDbContext.Entry(current_service).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene una lista de todos los servicios.
        /// </summary>
        /// <returns>La lista de servicios.</returns>
        public async Task<List<Service>> GetAllAsync()
        {
            var services = await _webDbContext.Services!.ToListAsync();
            return services;
        }

        /// <summary>
        /// Elimina todos los servicios.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Services!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}