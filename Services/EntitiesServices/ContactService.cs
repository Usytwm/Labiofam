using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class ContactService : IEntityService<Contact>
{
    private readonly WebDbContext _webDbContext;
    public ContactService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Contact> GetAsync(Guid contact_id)
    {
        var current_contact = await _webDbContext.FindAsync<Contact>(contact_id)
            ?? throw new InvalidOperationException("Contact not found");

        return current_contact;
    }

    public async Task<Contact> GetAsync(string contact_name)
    {
        var current_contact = await _webDbContext.Contacts!.FirstOrDefaultAsync(
            x => x.Name!.Equals(contact_name)
            ) ?? throw new InvalidOperationException("Contact not found");

        return current_contact;
    }

    public IEnumerable<Contact> Take(int size) =>
        _webDbContext.Contacts!.OrderBy(x => x.Name).Take(size);

    public async Task AddAsync(Contact new_contact)
    {
        if (await _webDbContext.Contacts!.AnyAsync(contact => contact.Name!.Equals(new_contact.Name)))
            throw new InvalidOperationException("The contact already exists");

        await _webDbContext.AddAsync(new_contact);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid contact_id)
    {
        var current_contact = await GetAsync(contact_id);

        _webDbContext.Remove(current_contact);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid contact_id, Contact edited_contact)
    {
        var current_contact = await GetAsync(contact_id);

        current_contact.Name = edited_contact.Name;
        current_contact.Image = edited_contact.Image;
        current_contact.Occupation = edited_contact.Occupation;
        current_contact.Contact_Info = edited_contact.Contact_Info;

        _webDbContext.Entry(current_contact).State = EntityState.Modified;
        await _webDbContext.SaveChangesAsync();
    }

    public async Task<List<Contact>> GetAllAsync()
    {
        var contacts = await _webDbContext.Contacts!.ToListAsync();
        return contacts;
    }

    public async Task RemoveAllAsync()
    {
        _webDbContext.RemoveRange(_webDbContext.Contacts!);
        await _webDbContext.SaveChangesAsync();
    }
}