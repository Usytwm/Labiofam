namespace Labiofam.Models;

public interface IEntityModel
{
    Guid Id { get; set; }
    string? Name { get; set; }
}