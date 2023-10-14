namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UserRoleController : Controller
{
    private readonly IRelationService<User_Role> _userRoleService;

    public UserRoleController(IRelationService<User_Role> userRoleService)
    {
        _userRoleService = userRoleService;
    }

    [HttpGet("{user_id}/{role_id}")]
    public async Task<IActionResult> GetUserRole(Guid user_id, Guid role_id)
    {
        try {
            var user_role = await _userRoleService.GetAsync(user_id, role_id);
            return Ok(user_role);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost("{user_id}/{role_id}")]
    public async Task<IActionResult> AddUserRole(Guid user_id, Guid role_id)
    {
        try {
            await _userRoleService.AddAsync(user_id, role_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{user_id}/{role_id}")]
    public async Task<IActionResult> RemoveUserRole(Guid user_id, Guid role_id)
    {
        try {
            await _userRoleService.RemoveAsync(user_id, role_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllUserRole()
    {
        try {
            var user_role = await _userRoleService.GetAllAsync();
            return Ok(user_role);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllUserRole()
    {
        try {
            await _userRoleService.RemoveAllAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}