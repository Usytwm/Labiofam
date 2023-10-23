using Labiofam.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class UserService : IRegistrationService<User, RegistrationModel>
{
    private readonly UserManager<User> _userManager;
    public UserService(UserManager<User> userManager) { _userManager = userManager; }

    public async Task<User> GetAsync(Guid user_id)
    {
        var current_user = await _userManager.FindByIdAsync(user_id.ToString())
            ?? throw new InvalidOperationException("User not found");

        return current_user;
    }

    public async Task<User> GetAsync(string user_name)
    {
        var current_user = await _userManager.FindByNameAsync(user_name)
            ?? throw new InvalidOperationException("User not found");

        return current_user;
    }

    public IEnumerable<User> Take(int size) =>
        _userManager.Users.OrderBy(x => x.UserName).Take(size);

    public async Task<User> AddAsync(RegistrationModel new_user)
    {
        if (await _userManager.FindByNameAsync(new_user.Name!) is not null)
            throw new InvalidOperationException("The user already exists");

        var result = new User()
        {
            UserName = new_user.Name,
            Email = new_user.Email
        };

        await _userManager.CreateAsync(
            result,
            new_user.Password ?? throw new ArgumentException("Password required")
        );

        return result;
    }

    public async Task RemoveAsync(Guid user_id)
    {
        var current_user = await GetAsync(user_id);

        await _userManager.DeleteAsync(current_user);
    }

    public async Task EditAsync(Guid user_id, RegistrationModel edited_model)
    {
        var current_user = await GetAsync(user_id);

        current_user.UserName = edited_model.Name;
        if (edited_model.Old_Password is not null && edited_model.Password is not null)
            await _userManager.ChangePasswordAsync(
                current_user, edited_model.Old_Password, edited_model.Password
                );
        if (edited_model.Email is not null && edited_model.Email_Token is not null)
            await _userManager.ChangeEmailAsync(
                current_user, edited_model.Email, edited_model.Email_Token
                );

        await _userManager.UpdateAsync(current_user);
    }

    public async Task<List<User>> GetAllAsync()
    {
        var users = await _userManager.Users.ToListAsync();
        return users;
    }

    public async Task RemoveAllAsync()
    {
        var users = await GetAllAsync();
        foreach (var user in users)
            await _userManager.DeleteAsync(user);
    }
}