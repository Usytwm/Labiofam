namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class ServiceService : IEntityService<Service>
{
    private readonly WebDbContext _webDbContext;
    public ServiceService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Service> GetAsync(Guid service_id)
    {
        var services = _webDbContext.Services!;
        var current_service = await services.FirstOrDefaultAsync(
            service => service.Service_ID.Equals(service_id)
            );
        if (current_service is not null)
        {
            return current_service;
        }
        throw new InvalidOperationException("Service not found");
    }
    public async Task AddAsync(Service new_service)
    {
        var services = _webDbContext.Services!;
        
        if (services.Any(service => service.Name!.Equals(new_service.Name)))
            throw new InvalidOperationException("The service already exists");

        new_service.Service_ID = Guid.NewGuid();

        services.Add(new_service);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid service_id)
    {
        var services = _webDbContext.Services!;
        var current_service = await services.FirstOrDefaultAsync(
            service => service.Service_ID!.Equals(service_id)
            ) ?? throw new InvalidOperationException("Service not found");

        services.Remove(current_service);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid service_id, Service edited_service)
    {
        var services = _webDbContext.Services!;
        var current_service = await services.FirstOrDefaultAsync(
            service => service.Service_ID!.Equals(service_id)
            ) ?? throw new InvalidOperationException("Service not found");

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