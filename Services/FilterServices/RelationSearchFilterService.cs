/*using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public abstract class RelationSearchFilterService<T> where T : class, IRelationModel
{
    private readonly WebDbContext _webDbContext;
    private readonly ISearchFilter<T> _searchFilter;

    public RelationSearchFilterService(WebDbContext webDbContext,
        ISearchFilter<T> searchFilter)
    {
        _webDbContext = webDbContext;
        _searchFilter = searchFilter;
    }

    public async Task<List<Type>> GetByTypeSubstring(string substring, Type type)
    {
        var entities = await _searchFilter.GetBySubstring(substring);
        
        var result = new List<Type>();
        foreach(var entity in entities)
        {
            var relation = await _webDbContext.Set<Product_POS>()
                .Where(x => x.Id1 == entity.Id1)
                .ToListAsync();
            
            foreach (var ppos in relation)
            {
                if (result.Any(x => x.Id2 == ppos.Point_ID))
                    continue;
                
                result.Add(await _webDbContext.FindAsync<Type>(ppos.Point_ID)
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
            var relation = await _webDbContext.Set<Product_POS>()
                .Where(x => x.Point_ID == point.Point_ID)
                .ToListAsync();
            
            foreach (var product in relation)
            {
                if (result.Any(x => x.Product_ID == product.Product_ID))
                    continue;
                
                result.Add(await _webDbContext.FindAsync<Product>(product.Product_ID)
                    ?? throw new NullReferenceException());
            }
        }
        return result;
    }

    
}*/