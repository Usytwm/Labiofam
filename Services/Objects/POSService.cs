namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class POSService : IEntityService<Point_of_Sales>
{
    private readonly WebDbContext _webDbContext;
    public POSService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Point_of_Sales> GetAsync(Guid Point_ID)
    {
        var poss = _webDbContext.Points_Of_Sales!;
        var current_pos = await poss.FirstOrDefaultAsync(
            pos => pos.Point_ID.Equals(Point_ID)
            );
        if (current_pos is not null)
        {
            return current_pos;
        }
        throw new InvalidOperationException("Points of sales not found");
    }
    public async Task AddAsync(Point_of_Sales new_pos)
    {
        var poss = _webDbContext.Points_Of_Sales!;
        
        if (poss.Any(pos => pos.Name!.Equals(new_pos.Name)))
            throw new InvalidOperationException("The point of sales already exists");

        new_pos.Point_ID = Guid.NewGuid();

        poss.Add(new_pos);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid Point_ID)
    {
        var poss = _webDbContext.Points_Of_Sales!;
        var current_pos = await poss.FirstOrDefaultAsync(
            pos => pos.Point_ID!.Equals(Point_ID)
            ) ?? throw new InvalidOperationException("Point of sales not found");

        poss.Remove(current_pos);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid Point_ID, Point_of_Sales edited_pos)
    {
        var poss = _webDbContext.Points_Of_Sales!;
        var current_pos = await poss.FirstOrDefaultAsync(
            pos => pos.Point_ID!.Equals(Point_ID)
            ) ?? throw new InvalidOperationException("Point of sales not found");

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