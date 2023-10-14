namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class UserService : IEntityService<User>
{
    private readonly WebDbContext _webDbContext;
    public UserService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<User> GetAsync(Guid user_id)
    {
        var users = _webDbContext.Users!;
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");
        
        return current_user;
    }
    public async Task AddAsync(User new_user)
    {
        var users = _webDbContext.Users!;        
        if (users.Any(user => user.Name!.Equals(new_user.Name)))
            throw new InvalidOperationException("The user already exists");

        new_user.User_ID = Guid.NewGuid();

        users.Add(new_user);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid user_id)
    {
        var users = _webDbContext.Users!;
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");

        users.Remove(current_user);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid user_id, User edited_user)
    {
        var users = _webDbContext.Users!;
        var current_user = await users.FirstOrDefaultAsync(
            user => user.User_ID!.Equals(user_id)
            ) ?? throw new InvalidOperationException("User not found");

        current_user.Name = edited_user.Name;
        current_user.Password = edited_user.Password;

        _webDbContext.Entry(current_user).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<User>> GetAllAsync()
    {
        var users = await _webDbContext.Users!.ToListAsync();
        return users;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Users!);
        await _webDbContext.SaveChangesAsync();
    }
}