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

public interface IProductPOSService : IRelationService<Product_POS>
{
    Task AddAsync(Guid product_id, Guid pos_id, int size);
}

//nueva interfaz
public interface IUserRoleService : IRelationService<User_Role>
{
    Task<List<Role>> GetRolesAsync(Guid user_id);
}