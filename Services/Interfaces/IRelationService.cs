namespace Labiofam.Services;

public interface IRelationService<T>
{
    Task<T> GetAsync(Guid model1_id, Guid model2_id);
    Task AddAsync(Guid new_model1, Guid new_model2);
    Task RemoveAsync(Guid model1_id, Guid model2_id);
    Task<List<T>> GetAllAsync();
    Task RemoveAllAsync();
}