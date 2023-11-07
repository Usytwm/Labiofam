using Labiofam.Models;

namespace Labiofam.Services;

public interface ISearchFilter
{
    Task<List<Client>> GetClientsBySubstring(string substring);
    Task<List<Contact>> GetContactsBySubstring(string substring);
    Task<List<Point_of_Sales>> GetPOSBySubstring(string substring);
    Task<List<Product>> GetProductsBySubstring(string substring);
    Task<List<Role>> GetRolesBySubstring(string substring);
    Task<List<Service>> GetServicesBySubstring(string substring);
    Task<List<User>> GetUsersBySubstring(string substring);
}
// pendiente pendiente pendiente pendiente pendiente
public interface IRelationSearchFilter
{
    Task<List<Point_of_Sales>> GetPOSByProductSubstring(string substring);
    Task<List<Product>> GetProductsByPOSSubstring(string substring);
}