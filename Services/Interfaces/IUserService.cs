using Labiofam.Models;

namespace Labiofam.Services;

public interface IUserService
{
    Task<User> GetUserAsync(Guid user_id);
    Task AddUserAsync(User new_user);
    Task RemoveUserAsync(Guid user_id);
    Task EditUserAsync(Guid user_id, User edited_user);
    Task<List<User>> GetAllUsersAsync();
    Task RemoveAllUsersAsync();
}