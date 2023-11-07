using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;
// pendiente pendiente pendiente pendiente pendiente
public class RelationSearchFilterService : IRelationSearchFilter
{
    private readonly WebDbContext _webDbContext;
    private readonly ISearchFilter _searchFilter;

    public RelationSearchFilterService(WebDbContext webDbContext,
        ISearchFilter searchFilter)
    {
        _webDbContext = webDbContext;
        _searchFilter = searchFilter;
    }

    public async Task<List<Point_of_Sales>> GetPOSByProductSubstring(string substring)
    {
        var products = await _searchFilter.GetProductsBySubstring(substring);
        
        var result = new List<Point_of_Sales>();
        foreach(var product in products)
        {
            var products_pos = await _webDbContext.Product_POS!
                .Where(x => x.Product_ID == product.Product_ID)
                .ToListAsync();
            
            foreach (var ppos in products_pos)
            {
                if (result.Any(x => x.Point_ID == ppos.Point_ID))
                    continue;
                
                result.Add(await _webDbContext.FindAsync<Point_of_Sales>(ppos.Point_ID)
                    ?? throw new NullReferenceException());
            }
        }
        return result;
    }

    public async Task<List<Product>> GetProductsByPOSSubstring(string substring)
    {
        var poss = await _searchFilter.GetPOSBySubstring(substring);
        
        var result = new List<Product>();
        foreach(var point in poss)
        {
            var products_pos = await _webDbContext.Product_POS!
                .Where(x => x.Point_ID == point.Point_ID)
                .ToListAsync();
            
            foreach (var product in products_pos)
            {
                if (result.Any(x => x.Product_ID == product.Product_ID))
                    continue;
                
                result.Add(await _webDbContext.FindAsync<Product>(product.Product_ID)
                    ?? throw new NullReferenceException());
            }
        }
        return result;
    }

    
}