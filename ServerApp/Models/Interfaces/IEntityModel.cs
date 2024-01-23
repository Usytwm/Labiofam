namespace Labiofam.Models;

public interface IEntityDTO
{
    Guid Id { get; set; }
    string? Name { get; set; }
}