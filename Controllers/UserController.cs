namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{user_id}")]
    public async Task<IActionResult> GetUser(Guid user_id)
    {
        try {
            var user = await _userService.GetUserAsync(user_id);
            return Ok(user);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost]
    public async Task<IActionResult> AddUser(User new_User)
    {
        try {
            await _userService.AddUserAsync(new_User);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{user_id}")]
    public async Task<IActionResult> RemoveUser(Guid user_id)
    {
        try {
            await _userService.RemoveUserAsync(user_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPut("{user_id}")]
    public async Task<IActionResult> EditUser(Guid user_id, User edited_user)
    {
        try {
            await _userService.EditUserAsync(user_id, edited_user);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        try {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllUsers()
    {
        try {
            await _userService.RemoveAllUsersAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}