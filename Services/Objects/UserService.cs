namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly WebDbContext _webDbContext;
    public UserService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<User> GetUserAsync(Guid user_id)
    {
        var users = _webDbContext.Users ??
            throw new InvalidOperationException("No users available");
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID.Equals(user_id)
            );
        if (current_user is not null)
        {
            return current_user;
        }
        throw new InvalidOperationException("User not found");
    }
    public async Task AddUserAsync(User new_user)
    {
        var users = _webDbContext.Users ??
            throw new InvalidOperationException("No users available");
        
        if (users.Any(user => user.Name!.Equals(new_user.Name)))
            throw new InvalidOperationException("The user already exists");

        new_user.User_ID = Guid.NewGuid();

        users.Add(new_user);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveUserAsync(Guid user_id)
    {
        var users = _webDbContext.Users ??
            throw new InvalidOperationException("No users available");
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");

        users.Remove(current_user);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditUserAsync(Guid user_id, User edited_user)
    {
        var users = _webDbContext.Users ??
            throw new InvalidOperationException("No users available");
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");

        current_user.Name = edited_user.Name;
        current_user.Password = edited_user.Password;

        _webDbContext.Entry(current_user).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        var users = await _webDbContext.Users!.ToListAsync();
        return users;
    }

    public async Task RemoveAllUsersAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Users!);
        await _webDbContext.SaveChangesAsync();
    }
}