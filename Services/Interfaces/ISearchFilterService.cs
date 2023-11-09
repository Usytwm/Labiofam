using Labiofam.Models;

namespace Labiofam.Services;

public interface ISearchFilter<Entity>
{
    Task<List<Entity>> GetBySubstring(string substring);
}
// pendiente pendiente pendiente pendiente pendiente
public interface IRelationSearchFilter
{
    Task<List<Point_of_Sales>> GetPOSByProductSubstring(string substring);
    Task<List<Product>> GetProductsByPOSSubstring(string substring);
}