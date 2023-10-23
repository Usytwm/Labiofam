using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly IRegistrationService<User, RegistrationModel> _userService;

    public UserController(IRegistrationService<User, RegistrationModel> userService)
    {
        _userService = userService;
    }

    [HttpGet("{user_id}")]
    public async Task<IActionResult> GetUser(Guid user_id)
    {
        try
        {
            var user = await _userService.GetAsync(user_id);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet("name/{user_name}")]
    public async Task<IActionResult> GetUser(string user_name)
    {
        try
        {
            var user = await _userService.GetAsync(user_name);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet("take/{size}")]
    public IEnumerable<User> Take(int size) => _userService.Take(size);
    [HttpPost]
    public async Task<IActionResult> AddUser(RegistrationModel model)
    {
        try
        {
            await _userService.AddAsync(model);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{user_id}")]
    public async Task<IActionResult> RemoveUser(Guid user_id)
    {
        try
        {
            await _userService.RemoveAsync(user_id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpPut("{user_id}")]
    public async Task<IActionResult> EditUser(Guid user_id, RegistrationModel edited_user)
    {
        try
        {
            await _userService.EditAsync(user_id, edited_user);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllUsers()
    {
        try
        {
            await _userService.RemoveAllAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}