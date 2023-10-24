using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ContactService : IEntityService<Contact>
    {
        private readonly WebDbContext _webDbContext;

        public ContactService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto.</param>
        /// <returns>El contacto encontrado.</returns>
        public async Task<Contact> GetAsync(Guid contact_id)
        {
            var current_contact = await _webDbContext.FindAsync<Contact>(contact_id)
                ?? throw new InvalidOperationException("Contacto no encontrado");
            return current_contact;
        }

        /// <summary>
        /// Obtiene un contacto por su nombre.
        /// </summary>
        /// <param name="contact_name">Nombre del contacto.</param>
        /// <returns>El contacto encontrado.</returns>
        public async Task<Contact> GetAsync(string contact_name)
        {
            var current_contact = await _webDbContext.Contacts!.FirstOrDefaultAsync(
                x => x.Name!.Equals(contact_name)
            ) ?? throw new InvalidOperationException("Contacto no encontrado");
            return current_contact;
        }

        /// <summary>
        /// Obtiene una lista de contactos limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de contactos.</param>
        /// <returns>La lista de contactos.</returns>
        public IEnumerable<Contact> Take(int size) =>
            _webDbContext.Contacts!.OrderBy(x => x.Name).Take(size);

        /// <summary>
        /// Agrega un nuevo contacto.
        /// </summary>
        /// <param name="new_contact">Nuevo contacto a agregar.</param>
        public async Task AddAsync(Contact new_contact)
        {
            if (await _webDbContext.Contacts!.AnyAsync(contact => contact.Name!.Equals(new_contact.Name)))
                throw new InvalidOperationException("El contacto ya existe");

            await _webDbContext.AddAsync(new_contact);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto a eliminar.</param>
        public async Task RemoveAsync(Guid contact_id)
        {
            var current_contact = await GetAsync(contact_id);
            _webDbContext.Remove(current_contact);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Edita un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto a editar.</param>
        /// <param name="edited_contact">Contacto editado.</param>
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

        /// <summary>
        /// Obtiene todos los contactos.
        /// </summary>
        /// <returns>La lista de todos los contactos.</returns>
        public async Task<List<Contact>> GetAllAsync()
        {
            var contacts = await _webDbContext.Contacts!.ToListAsync();
            return contacts;
        }

        /// <summary>
        /// Elimina todos los contactos.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Contacts!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}