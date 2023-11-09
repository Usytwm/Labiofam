using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public abstract class SearchFilterService<T> where T : class, IEntityModel
{
    private readonly WebDbContext _webDbContext;

    public SearchFilterService(WebDbContext webDbContext)
    {
        _webDbContext = webDbContext;
    }

    public async Task<List<T>> GetBySubstring(string substring)
    {
        var result = await _webDbContext.Set<T>()
            .Where(x => x.Name!.Contains(substring))
            .ToListAsync();
        return result;
    }
}