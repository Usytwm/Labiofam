using Labiofam.Models;

namespace Labiofam.Services;

public interface IRelationFilter<T, T1, T2>
{
    /// <summary>
    /// Obtiene una lista de objetos de tipo T2 por un objeto de tipo T1 mediante su ID.
    /// </summary>
    /// <param name="id">ID del objeto de tipo T1</param>
    /// <returns>Una lista de objetos de tipo T2</returns>
    Task<ICollection<T2>> GetType2ByType1(Guid id);

    /// <summary>
    /// Obtiene una lista de objetos de tipo T1 por un objeto de tipo T2 mediante su ID.
    /// </summary>
    /// <param name="id">ID del objeto de tipo T2</param>
    /// <returns>Una lista de objetos de tipo T1</returns>
    Task<ICollection<T1>> GetType1ByType2(Guid id);

    /// <summary>
    /// Obtiene una lista de objetos de tipo 2 relacionadas con los objetos
    /// de tipo 1 cuyo nombre contenga la subcadena dada.
    /// </summary>
    /// <param name="substring">La subacadena dada.</param>
    /// <returns>Una lista de entidades de tipo 2.</returns>
    Task<ICollection<T2>> GetType2ByType1Substring(string substring);

    /// <summary>
    /// Obtiene una lista de entidades de tipo 1 relacionadas con los objetos
    /// de tipo 2 cuyo nombre contenga la subcadena dada.
    /// </summary>
    /// <param name="substring">La subacadena dada.</param>
    /// <returns>Una lista de entidades de tipo 1.</returns>
    Task<ICollection<T1>> GetType1ByType2Substring(string substring);

    /// <summary>
    /// Agrega una colección de objetos de tipo T2 asociados a un objeto de tipo T1
    /// basado en un identificador específico.
    /// </summary>
    /// <param name="id">El identificador del objeto T1.</param>
    /// <param name="entities">La colección de objetos de tipo T2 a agregar.</param>
    Task AddType2ByType1(Guid id, ICollection<T2> entities);

    /// <summary>
    /// Agrega una colección de objetos de tipo T1 asociados a un objeto de tipo T2
    /// basado en un identificador específico.
    /// </summary>
    /// <param name="id">El identificador del objeto T2.</param>
    /// <param name="entities">La colección de objetos de tipo T1 a agregar.</param>
    Task AddType1ByType2(Guid id, ICollection<T1> entities);
}

public interface IProductPOSFilter
{
    /// <summary>
    /// Agrega una colección de productos asociados a un punto de venta basado en el ID del punto de venta.
    /// </summary>
    /// <param name="pos_id">El identificador del punto de venta.</param>
    /// <param name="entities">La colección de productos a agregar.</param>
    /// <param name="size">Cantidad de productos de cada tipo a agregar.</param>
    Task AddType1ByType2(Guid pos_id, ICollection<Product> entities, ICollection<int> sizes);
}