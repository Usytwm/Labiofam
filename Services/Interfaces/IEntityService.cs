namespace Labiofam.Services;

public interface IEntityService<Entity>
{
    Task<Entity> GetAsync(Guid model_id);
    Task<Entity> GetAsync(string name);
    IEnumerable<Entity> Take(int size);
    Task AddAsync(Entity new_model);
    Task RemoveAsync(Guid model_id);
    Task EditAsync(Guid model_id, Entity edited_model);
    Task<List<Entity>> GetAllAsync();
    Task RemoveAllAsync();
}