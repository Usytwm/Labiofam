namespace Labiofam.Models;

public class Province
{
    public string? Id { get; set; }
    public string? Nombre { get; set; }
    public ICollection<string>? Municipios { get; set; }
}