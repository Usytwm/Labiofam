using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public abstract class EntityNoModelService<T> : EntityService<T>, IEntityNoModelService<T>
        where T : class, IEntityModel
    {
        private readonly WebDbContext _webDbContext;
        
        public EntityNoModelService(WebDbContext webDbContext) : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }
        
        /// <summary>
        /// Agrega una nueva entidad.
        /// </summary>
        /// <param name="new_entity">La entidad a agregar.</param>
        public async Task AddAsync(T new_entity)
        {
            if (await _webDbContext.Set<T>().AnyAsync(entity => entity.Name!.Equals(new_entity.Name)))
                throw new InvalidOperationException("La entidad ya existe");

            await _webDbContext.AddAsync(new_entity);
            await _webDbContext.SaveChangesAsync();
        }
        
        /// <summary>
        /// Método abstracto para editar una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad a editar.</param>
        /// <param name="edited_entity">La entidad editada.</param>
        public abstract Task EditAsync(Guid id, T edited_entity);
    }
}