namespace Labiofam.Services;

public interface IRegistrationService<Entity, Model>
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
    /// Agrega un nuevo modelo de forma asincrónica y devuelve la entidad asociada.
    /// </summary>
    /// <param name="new_model">El nuevo modelo a agregar</param>
    /// <returns>La entidad asociada al nuevo modelo</returns>
    Task<Entity> AddAsync(Model new_model);

    /// <summary>
    /// Elimina una entidad de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    Task RemoveAsync(Guid model_id);

    /// <summary>
    /// Edita un modelo de forma asincrónica por su ID de modelo.
    /// </summary>
    /// <param name="model_id">ID del modelo</param>
    /// <param name="edited_model">El modelo editado</param>
    Task EditAsync(Guid model_id, Model edited_model);

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