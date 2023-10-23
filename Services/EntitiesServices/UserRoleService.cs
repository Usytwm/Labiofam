using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class UserRoleService : IRelationService<User_Role>
{
    private readonly WebDbContext _webDbContext;
    public UserRoleService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<User_Role> GetAsync(Guid user_id, Guid role_id)
    {
        var user_role = await _webDbContext.User_Role!.FirstOrDefaultAsync(
            x => x.UserId.Equals(user_id) && x.RoleId.Equals(role_id)
            ) ?? throw new InvalidOperationException("User_Role not found");

        return user_role;
    }

    public IEnumerable<User_Role> Take(int size) =>
        _webDbContext.User_Role!.Take(size);

    public async Task AddAsync(Guid user_id, Guid role_id)
    {
        try
        {
            await GetAsync(user_id, role_id);
            throw new InvalidOperationException("The User_Role already exists");
        }
        catch
        { 
            await _webDbContext.AddAsync(new User_Role()
            {
                UserId = user_id,
                RoleId = role_id
            });
            await _webDbContext.SaveChangesAsync();
        }
    }

    public async Task RemoveAsync(Guid user_id, Guid role_id)
    {
        var current_user_role = await GetAsync(user_id, role_id);

        _webDbContext.Remove(current_user_role);
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