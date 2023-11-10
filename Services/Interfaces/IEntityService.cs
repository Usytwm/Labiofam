namespace Labiofam.Services;

public interface IEntityService<Entity>
{
    /// <summary>
    /// Obtiene una entidad de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    /// <returns>La entidad correspondiente al ID de modelo</returns>
    Task<Entity> GetAsync(Guid model_id);

    /// <summary>
    /// Obtiene una entidad de forma asincrónica por su nombre.
    /// </summary>
    /// <param name="name">Nombre de la entidad</param>
    /// <returns>La entidad correspondiente al nombre</returns>
    Task<Entity> GetAsync(string name);

    /// <summary>
    /// Obtiene una colección de entidades que contengan el substring en su nombre.
    /// </summary>
    /// <param name="substring">Cadena de caracteres</param>
    /// <returns>Una colección de entidades</returns>
    Task<ICollection<Entity>> GetBySubstring(string substring);

    /// <summary>
    /// Obtiene una colección de entidades de tamaño específico.
    /// </summary>
    /// <param name="size">Tamaño de la colección</param>
    /// <returns>Una colección de entidades</returns>
    IEnumerable<Entity> Take(int size);

    /// <summary>
    /// Obtiene una colección de entidades de tamaño específico
    /// para una porción dada de la colección original.
    /// </summary>
    /// <param name="size">Tamaño de la colección</param>
    /// <param name="page_number">Número de la página</param>
    /// <returns>Una colección de entidades</returns>
    IEnumerable<Entity> TakeRange(int size, int page_number);

    /// <summary>
    /// Elimina una entidad de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    Task RemoveAsync(Guid model_id);

    /// <summary>
    /// Obtiene todas las entidades de forma asincrónica.
    /// </summary>
    /// <returns>Una lista de todas las entidades</returns>
    Task<ICollection<Entity>> GetAllAsync();

    /// <summary>
    /// Elimina todas las entidades de forma asincrónica.
    /// </summary>
    Task RemoveAllAsync();
}

public interface IEntityModelService<Entity, Model>
{
    /// <summary>
    /// Agrega un nuevo modelo de forma asincrónica y devuelve la entidad asociada.
    /// </summary>
    /// <param name="new_model">El nuevo modelo a agregar</param>
    /// <returns>La entidad asociada al nuevo modelo</returns>
    Task<Entity> AddAsync(Model new_model);

    /// <summary>
    /// Edita un modelo de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    /// <param name="edited_model">El modelo editado</param>
    Task EditAsync(Guid model_id, Model edited_model);
}

public interface IEntityNoModelService<Entity>
{
    /// <summary>
    /// Agrega una nueva entidad de forma asincrónica.
    /// </summary>
    /// <param name="new_model">La nueva entidad a agregar</param>
    Task AddAsync(Entity new_model);

    /// <summary>
    /// Edita una entidad de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    /// <param name="edited_model">La entidad editada</param>
    Task EditAsync(Guid model_id, Entity edited_model);
}