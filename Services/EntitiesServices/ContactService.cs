using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ContactService : EntityService<Contact>,
        IEntityService<Contact>, IEntityNoModelService<Contact>
    {
        private readonly WebDbContext _webDbContext;

        public ContactService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Edita un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto a editar.</param>
        /// <param name="edited_contact">Contacto editado.</param>
        public override async Task EditAsync(Guid contact_id, Contact edited_contact)
        {
            var current_contact = await GetAsync(contact_id);
            current_contact.Name = edited_contact.Name;
            current_contact.Image = edited_contact.Image;
            current_contact.Occupation = edited_contact.Occupation;
            current_contact.Contact_Info = edited_contact.Contact_Info;
            _webDbContext.Entry(current_contact).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }
    }
}