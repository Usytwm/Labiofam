using Labiofam.Models;

namespace Labiofam.Services;

public interface IJsonService
{
    ICollection<Province> JsonReader();
}