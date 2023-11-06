using Labiofam.Models;

namespace Labiofam.Services;

public interface IRelationService<Entity>
{
    Task<Entity> GetAsync(Guid model1_id, Guid model2_id);
    IEnumerable<Entity> Take(int size);
    Task AddAsync(Guid new_model1, Guid new_model2);
    Task RemoveAsync(Guid model1_id, Guid model2_id);
    Task<List<Entity>> GetAllAsync();
    Task RemoveAllAsync();
}

public interface IProductPOSService
{
    Task AddAsync(Guid product_id, Guid pos_id, int size);
}