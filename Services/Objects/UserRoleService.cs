namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class UserRoleService : IRelationService<User_Role>
{
    private readonly WebDbContext _webDbContext;
    public UserRoleService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<User_Role> GetAsync(Guid user_id, Guid role_id)
    {
        var user_role = await _webDbContext.User_Role!.FirstOrDefaultAsync(
            ur => ur.User_ID.Equals(user_id) && ur.Role_ID.Equals(role_id)
            ) ?? throw new InvalidOperationException("User_Role not found");
    
        return user_role;
    }
    public async Task AddAsync(Guid user_id, Guid role_id)
    {
        var users = _webDbContext.Users!;
        var roles = _webDbContext.Roles!;
        var user_role = _webDbContext.User_Role!;
        if (user_role.Any(ur => ur.User_ID!.Equals(user_id) &&
            ur.Role_ID.Equals(role_id)))
            throw new InvalidOperationException("The User_Role already exists");
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");
        var current_role = await roles.FirstOrDefaultAsync(
            role => role.Role_ID!.Equals(role_id)
            ) ?? throw new InvalidOperationException("Role not found");

        var new_relation = new User_Role() {
            User_ID = user_id,
            User = current_user,
            Role_ID = role_id,
            Role = current_role
        };
        
        user_role.Add(new_relation);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid user_id, Guid role_id)
    {
        var users = _webDbContext.Users!;
        var roles = _webDbContext.Roles!;
        var user_role = _webDbContext.User_Role!;
        var current_user_role = await user_role!.FirstOrDefaultAsync(
            ur => ur.User_ID.Equals(user_id) && ur.Role_ID.Equals(role_id)
            ) ?? throw new InvalidOperationException("User_Role not found");

        user_role.Remove(current_user_role);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<User_Role>> GetAllAsync()
    {
        var user_role = await _webDbContext.User_Role!.ToListAsync();
        return user_role;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.User_Role!);
        await _webDbContext.SaveChangesAsync();
    }
}