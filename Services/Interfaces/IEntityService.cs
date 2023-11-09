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
    /// Obtiene una colección de entidades de tamaño específico.
    /// </summary>
    /// <param name="size">Tamaño de la colección</param>
    /// <returns>Una colección de entidades</returns>
    IEnumerable<Entity> Take(int size);

    /// <summary>
    /// Agrega una nueva entidad de forma asincrónica.
    /// </summary>
    /// <param name="new_model">La nueva entidad a agregar</param>
    Task AddAsync(Entity new_model);

    /// <summary>
    /// Elimina una entidad de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    Task RemoveAsync(Guid model_id);

    /// <summary>
    /// Edita una entidad de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    /// <param name="edited_model">La entidad editada</param>
    Task EditAsync(Guid model_id, Entity edited_model);

    /// <summary>
    /// Obtiene todas las entidades de forma asincrónica.
    /// </summary>
    /// <returns>Una lista de todas las entidades</returns>
    Task<List<Entity>> GetAllAsync();

    /// <summary>
    /// Elimina todas las entidades de forma asincrónica.
    /// </summary>
    Task RemoveAllAsync();
}