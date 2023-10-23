using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class POSService : IEntityService<Point_of_Sales>
{
    private readonly WebDbContext _webDbContext;
    public POSService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Point_of_Sales> GetAsync(Guid point_id)
    {
        var current_pos = await _webDbContext.FindAsync<Point_of_Sales>(point_id)
            ?? throw new InvalidOperationException("Points of sales not found");

        return current_pos;
    }

    public async Task<Point_of_Sales> GetAsync(string point_name)
    {
        var current_point = await _webDbContext.Points_Of_Sales!.FirstOrDefaultAsync(
            x => x.Name!.Equals(point_name)
            ) ?? throw new InvalidOperationException("Point of sales not found");

        return current_point;
    }

    public IEnumerable<Point_of_Sales> Take(int size) =>
        _webDbContext.Points_Of_Sales!.OrderBy(x => x.Name).Take(size);

    public async Task AddAsync(Point_of_Sales new_pos)
    {
        if (await _webDbContext.Points_Of_Sales!.AnyAsync(pos => pos.Name!.Equals(new_pos.Name)))
            throw new InvalidOperationException("The point of sales already exists");

        await _webDbContext.AddAsync(new_pos);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid point_id)
    {
        var current_pos = await GetAsync(point_id);

        _webDbContext.Remove(current_pos);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid point_id, Point_of_Sales edited_pos)
    {
        var current_pos = await GetAsync(point_id);

        current_pos.Name = edited_pos.Name;
        current_pos.Address = edited_pos.Address;
        current_pos.Image = edited_pos.Image;
        current_pos.Latitude = edited_pos.Latitude;
        current_pos.Longitude = edited_pos.Longitude;
        current_pos.Municipality = edited_pos.Municipality;
        current_pos.Province = current_pos.Province;

        _webDbContext.Entry(current_pos).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Point_of_Sales>> GetAllAsync()
    {
        var poss = await _webDbContext.Points_Of_Sales!.ToListAsync();
        return poss;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Points_Of_Sales!);
        await _webDbContext.SaveChangesAsync();
    }
}