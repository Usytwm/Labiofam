namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class RoleService : IRoleService
{
    private readonly WebDbContext _webDbContext;
    public RoleService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Role> GetRoleAsync(Guid user_id)
    {
        var users = _webDbContext.Roles ??
            throw new InvalidOperationException("No role available");
        var current_user = await users.FirstOrDefaultAsync(
            user => user.Role_ID.Equals(user_id)
            );
        if (current_user is not null)
        {
            return current_user;
        }
        throw new InvalidOperationException("role not found");
    }
    public async Task AddRoleAsync(Role new_user)
    {
        var role = _webDbContext.Roles ??
            throw new InvalidOperationException("No role available");

        if (role.Any(user => user.Name!.Equals(new_user.Name)))
            throw new InvalidOperationException("The role already exists");

        new_user.Role_ID = Guid.NewGuid();

        role.Add(new_user);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveRoleAsync(Guid user_id)
    {
        var roles = _webDbContext.Users ??
            throw new InvalidOperationException("No role available");
        var current_user = await roles.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("Role not found");

        roles.Remove(current_user);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditRoleAsync(Guid user_id, Role edited_role)
    {
        var role = _webDbContext.Roles ??
            throw new InvalidOperationException("No roles available");
        var current_role = await role.FirstOrDefaultAsync(
            user => user.Role_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("Role not found");

        current_role.Name = edited_role.Name;
        current_role.Description = edited_role.Description;

        _webDbContext.Entry(current_role).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Role>> GetAllRolesAsync()
    {
        var users = await _webDbContext.Roles!.ToListAsync();
        return users;
    }

    public async Task RemoveAllRolesAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Roles!);
        await _webDbContext.SaveChangesAsync();
    }
}