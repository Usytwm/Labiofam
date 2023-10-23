using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoleController : Controller
{
    private readonly IRegistrationService<Role, RoleModel> _roleService;

    public RoleController(IRegistrationService<Role, RoleModel> roleService)
    {
        _roleService = roleService;
    }

    [HttpGet("{role_id}")]
    public async Task<IActionResult> GetRole(Guid role_id)
    {
        try {
            var role = await _roleService.GetAsync(role_id);
            return Ok(role);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet("name/{role_name}")]
    public async Task<IActionResult> GetRole(string role_name)
    {
        try {
            var role = await _roleService.GetAsync(role_name);
            return Ok(role);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet("take/{size}")]
    public IEnumerable<Role> Take(int size) => _roleService.Take(size);
    [HttpPost]
    public async Task<IActionResult> AddRole(RoleModel new_role)
    {
        try {
            await _roleService.AddAsync(new_role);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{role_id}")]
    public async Task<IActionResult> RemoveRole(Guid role_id)
    {
        try {
            await _roleService.RemoveAsync(role_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPut("{role_id}")]
    public async Task<IActionResult> EditRole(Guid role_id, RoleModel edited_role)
    {
        try {
            await _roleService.EditAsync(role_id, edited_role);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        try {
            var roles = await _roleService.GetAllAsync();
            return Ok(roles);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllRoles()
    {
        try {
            await _roleService.RemoveAllAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}