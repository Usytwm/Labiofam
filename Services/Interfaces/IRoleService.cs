using Labiofam.Models;

namespace Labiofam.Services;

public interface IRoleService
{
    Task<Role> GetRoleAsync(Guid user_id);
    Task AddRoleAsync(Role new_user);
    Task RemoveRoleAsync(Guid user_id);
    Task EditRoleAsync(Guid user_id, Role edited_user);
    Task<List<Role>> GetAllRolesAsync();
    Task RemoveAllRolesAsync();
}