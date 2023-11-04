namespace Labiofam.Services;

public interface IRegistrationService<Entity, Model>
{
    Task<Entity> GetAsync(Guid model_id);
    Task<Entity> GetAsync(string name);
    IEnumerable<Entity> Take(int size);
    Task<Entity> AddAsync(Model new_model);
    Task RemoveAsync(Guid model_id);
    Task EditAsync(Guid model_id, Model edited_model);
    Task<List<Entity>> GetAllAsync();
    Task RemoveAllAsync();
}