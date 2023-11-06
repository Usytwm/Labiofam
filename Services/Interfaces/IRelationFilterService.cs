using Labiofam.Models;

namespace Labiofam.Services;

public interface IRelationFilter
{
    Task<List<Role>> GetRolesByUser(Guid user_id);
    Task<List<User>> GetUsersByRole(Guid role_id);
    Task<List<Product>> GetProductsByUser(Guid user_id);
    Task<List<User>> GetUsersByProduct(Guid product_id);
    Task<List<Point_of_Sales>> GetPOSByProduct(Guid product_id);
    Task<List<Product>> GetProductsByPOS(Guid pos_id);
}