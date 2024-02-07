using System.ComponentModel.DataAnnotations;

namespace Labiofam.Models;

/// <summary>
/// Entidad de los testimonios.
/// </summary>
public class Testimonie : IEntityDTO
{
    /// <summary>
    /// Id de la entidad.
    /// </summary>
    [Key]
    public Guid Id { get; set; }
    /// <summary>
    /// Nombre del testimonio.
    /// </summary>
    [StringLength(64)]
    public string? Name { get; set; }
    /// <summary>
    /// Imagen del testimonio.
    /// </summary>
    [StringLength(1024)]
    public string? Image { get; set; }
    /// <summary>
    /// Video del testimonio.
    /// </summary>
    [StringLength(128)]
    public string? Video_Url { get; set; }
}