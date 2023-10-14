namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class RoleService : IEntityService<Role>
{
    private readonly WebDbContext _webDbContext;
    public RoleService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Role> GetAsync(Guid role_id)
    {
        var roles = _webDbContext.Roles!;
        var current_role = await roles.FirstOrDefaultAsync(
            role => role.Role_ID.Equals(role_id)
            );
        if (current_role is not null)
        {
            return current_role;
        }
        throw new InvalidOperationException("Role not found");
    }
    public async Task AddAsync(Role new_role)
    {
        var roles = _webDbContext.Roles!;
        
        if (roles.Any(role => role.Name!.Equals(new_role.Name)))
            throw new InvalidOperationException("The role already exists");

        new_role.Role_ID = Guid.NewGuid();

        roles.Add(new_role);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid role_id)
    {
        var roles = _webDbContext.Roles!;
        var current_role = await roles.FirstOrDefaultAsync(
            role => role.Role_ID!.Equals(role_id)
            ) ?? throw new InvalidOperationException("Role not found");

        roles.Remove(current_role);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid role_id, Role edited_role)
    {
        var roles = _webDbContext.Roles!;
        var current_role = await roles.FirstOrDefaultAsync(
            role => role.Role_ID!.Equals(role_id)
            ) ?? throw new InvalidOperationException("Role not found");

        current_role.Name = edited_role.Name;
        current_role.Description = edited_role.Description;

        _webDbContext.Entry(current_role).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Role>> GetAllAsync()
    {
        var roles = await _webDbContext.Roles!.ToListAsync();
        return roles;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Roles!);
        await _webDbContext.SaveChangesAsync();
    }
}