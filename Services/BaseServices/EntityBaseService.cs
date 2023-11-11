using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    /// <summary>
    /// Clase base abstracta para servicios de entidades.
    /// </summary>
    /// <typeparam name="T">Tipo de entidad.</typeparam>
    public abstract class EntityService<T> : IEntityService<T>
        where T : class, IEntityModel
    {
        private readonly WebDbContext _webDbContext;

        public EntityService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad.</param>
        /// <returns>La entidad encontrada.</returns>
        public async Task<T> GetAsync(Guid id)
        {
            var current_entity = await _webDbContext.FindAsync<T>(id)
                ?? throw new InvalidOperationException("Entidad no encontrada");
            return current_entity;
        }

        /// <summary>
        /// Obtiene una entidad por su nombre.
        /// </summary>
        /// <param name="name">Nombre de la entidad.</param>
        /// <returns>La entidad encontrada.</returns>
        public async Task<T> GetAsync(string name)
        {
            var current_entity = await _webDbContext.Set<T>().FirstOrDefaultAsync(
                x => x.Name!.Equals(name)
            ) ?? throw new InvalidOperationException("Entidad no encontrada");
            return current_entity;
        }

        /// <summary>
        /// Obtiene una lista de entidades que contengan el substring en su nombre.
        /// </summary>
        /// <param name="substring">Cadena de caracteres</param>
        /// <returns>Una lista de entidades</returns>
        public async Task<ICollection<T>> GetBySubstring(string substring)
        {
            var result = await _webDbContext.Set<T>()
                .Where(x => x.Name!.Contains(substring))
                .ToListAsync();
            return result;
        }

        /// <summary>
        /// Obtiene una lista de entidades con un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño de la lista.</param>
        /// <returns>La lista de entidades.</returns>
        public IEnumerable<T> Take(int size) =>
            _webDbContext.Set<T>().Take(size);

        /// <summary>
        /// Obtiene una lista de entidades con un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño de la lista.</param>
        /// <returns>La lista de entidades.</returns>
        public IEnumerable<T> TakeRange(int skip, int take) =>
            _webDbContext.Set<T>().Skip(skip).Take(take);

        /// <summary>
        /// Elimina una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad a eliminar.</param>
        public async Task RemoveAsync(Guid id)
        {
            var current_entity = await GetAsync(id);
            _webDbContext.Remove(current_entity);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene una lista de todas las entidades.
        /// </summary>
        /// <returns>La lista de entidades.</returns>
        public async Task<ICollection<T>> GetAllAsync()
        {
            var entities = await _webDbContext.Set<T>().ToListAsync();
            return entities;
        }

        /// <summary>
        /// Elimina todas las entidades.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Set<T>());
            await _webDbContext.SaveChangesAsync();
        }
    }
}