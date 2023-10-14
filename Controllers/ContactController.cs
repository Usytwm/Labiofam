namespace Labiofam.Controllers;
using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ContactController : Controller
{
    private readonly IEntityService<Contact> _contactService;

    public ContactController(IEntityService<Contact> contactService)
    {
        _contactService = contactService;
    }

    [HttpGet("{contact_id}")]
    public async Task<IActionResult> GetContact(Guid contact_id)
    {
        try {
            var contact = await _contactService.GetAsync(contact_id);
            return Ok(contact);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPost]
    public async Task<IActionResult> AddContact(Contact new_contact)
    {
        try {
            await _contactService.AddAsync(new_contact);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete("{contact_id}")]
    public async Task<IActionResult> RemoveContact(Guid contact_id)
    {
        try {
            await _contactService.RemoveAsync(contact_id);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpPut("{contact_id}")]
    public async Task<IActionResult> EditContact(Guid contact_id, Contact edited_contact)
    {
        try {
            await _contactService.EditAsync(contact_id, edited_contact);
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllContacts()
    {
        try {
            var contacts = await _contactService.GetAllAsync();
            return Ok(contacts);
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveAllContacts()
    {
        try {
            await _contactService.RemoveAllAsync();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex);
        }
    }
}