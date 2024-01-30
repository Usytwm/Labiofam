using Labiofam.Models;

namespace Labiofam.Services
{
    public abstract class EntityDTOService<T, DTO> : EntityService<T>, IEntityDTOService<T, DTO>
        where T : class, IEntityDTO
    {
        public EntityDTOService(WebDbContext webDbContext) : base(webDbContext) { }

        /// <summary>
        /// Agrega una nueva entidad.
        /// </summary>
        /// <param name="new_model">La entidad a agregar.</param>
        public abstract Task<T> AddAsync(DTO new_model);

        /// <summary>
        /// Agrega un nuevo ICollection de entidades.
        /// </summary>
        /// <param name="new_models">Las entidades a agregar.</param>
        public abstract Task<ICollection<T>> AddAsync(ICollection<DTO> new_model);

        /// <summary>
        /// Método abstracto para editar una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad a editar.</param>
        /// <param name="edited_model">La entidad editada.</param>
        public abstract Task EditAsync(Guid id, DTO edited_model);
    }
}