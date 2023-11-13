using Labiofam.Models;

namespace Labiofam.Services
{
    public abstract class EntityModelService<T, Model> : EntityService<T>, IEntityModelService<T, Model>
        where T : class, IEntityModel
    {
        public EntityModelService(WebDbContext webDbContext) : base(webDbContext) { }

        /// <summary>
        /// Agrega una nueva entidad.
        /// </summary>
        /// <param name="new_model">La entidad a agregar.</param>
        public abstract Task<T> AddAsync(Model new_model);

        /// <summary>
        /// Método abstracto para editar una entidad por su ID.
        /// </summary>
        /// <param name="id">ID de la entidad a editar.</param>
        /// <param name="edited_model">La entidad editada.</param>
        public abstract Task EditAsync(Guid id, Model edited_model);
    }
}