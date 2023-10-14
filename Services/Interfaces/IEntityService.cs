namespace Labiofam.Services;

public interface IEntityService<T>
{
    Task<T> GetAsync(Guid model_id);
    Task AddAsync(T new_model);
    Task RemoveAsync(Guid model_id);
    Task EditAsync(Guid model_id, T edited_model);
    Task<List<T>> GetAllAsync();
    Task RemoveAllAsync();
}