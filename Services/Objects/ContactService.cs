namespace Labiofam.Services;
using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

public class ContactService : IEntityService<Contact>
{
    private readonly WebDbContext _webDbContext;
    public ContactService(WebDbContext webDbContext) { _webDbContext = webDbContext; }

    public async Task<Contact> GetAsync(Guid contact_id)
    {
        var contacts = _webDbContext.Contacts!;
        var current_contact = await contacts.FirstOrDefaultAsync(
            contact => contact.Contact_ID.Equals(contact_id)
            );
        if (current_contact is not null)
        {
            return current_contact;
        }
        throw new InvalidOperationException("Contact not found");
    }
    public async Task AddAsync(Contact new_contact)
    {
        var contacts = _webDbContext.Contacts!;
        
        if (contacts.Any(contact => contact.Name!.Equals(new_contact.Name)))
            throw new InvalidOperationException("The contact already exists");

        new_contact.Contact_ID = Guid.NewGuid();

        contacts.Add(new_contact);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid contact_id)
    {
        var contacts = _webDbContext.Contacts!;
        var current_contact = await contacts.FirstOrDefaultAsync(
            contact => contact.Contact_ID!.Equals(contact_id)
            ) ?? throw new InvalidOperationException("Contact not found");

        contacts.Remove(current_contact);
        await _webDbContext.SaveChangesAsync();
    }

    public async Task EditAsync(Guid contact_id, Contact edited_contact)
    {
        var contacts = _webDbContext.Contacts!;
        var current_contact = await contacts.FirstOrDefaultAsync(
            contact => contact.Contact_ID!.Equals(contact_id)
            ) ?? throw new InvalidOperationException("Contact not found");

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