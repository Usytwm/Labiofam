using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class ServiceService : IEntityService<Service>
{
    private readonly WebDbContext _webDbContext;
    public ServiceService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Service> GetAsync(Guid service_id)
    {
        var current_service = await _webDbContext.FindAsync<Service>(service_id)
            ?? throw new InvalidOperationException("Service not found");

        return current_service;
    }

    public async Task<Service> GetAsync(string service_name)
    {
        var current_service = await _webDbContext.Services!.FirstOrDefaultAsync(
            x => x.Name!.Equals(service_name)
            ) ?? throw new InvalidOperationException("Service not found");

        return current_service;
    }

    public IEnumerable<Service> Take(int size) =>
        _webDbContext.Services!.OrderBy(x => x.Name).Take(size);

    public async Task AddAsync(Service new_service)
    {
        if (await _webDbContext.Services!.AnyAsync(service => service.Name!.Equals(new_service.Name)))
            throw new InvalidOperationException("The service already exists");

        await _webDbContext.AddAsync(new_service);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid service_id)
    {
        var current_service = await GetAsync(service_id);

        _webDbContext.Remove(current_service);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid service_id, Service edited_service)
    {
        var current_service = await GetAsync(service_id);

        current_service.Name = edited_service.Name;
        current_service.Info = edited_service.Info;

        _webDbContext.Entry(current_service).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Service>> GetAllAsync()
    {
        var services = await _webDbContext.Services!.ToListAsync();
        return services;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Services!);
        await _webDbContext.SaveChangesAsync();
    }
}