using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly IEntityService<Contact> _contactService;

        public ContactController(IEntityService<Contact> contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Obtiene un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto.</param>
        /// <returns>El contacto encontrado.</returns>
        [HttpGet("{contact_id}")]
        public async Task<IActionResult> GetContact(Guid contact_id)
        {
            try
            {
                var contact = await _contactService.GetAsync(contact_id);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene un contacto por su nombre.
        /// </summary>
        /// <param name="contact_name">Nombre del contacto.</param>
        /// <returns>El contacto encontrado.</returns>
        [HttpGet("name/{contact_name}")]
        public async Task<IActionResult> GetContact(string contact_name)
        {
            try
            {
                var contact = await _contactService.GetAsync(contact_name);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene una lista de contactos limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de contactos.</param>
        /// <returns>La lista de contactos.</returns>
        [HttpGet("take/{size}")]
        public IEnumerable<Contact> Take(int size) => _contactService.Take(size);

        /// <summary>
        /// Agrega un nuevo contacto.
        /// </summary>
        /// <param name="new_contact">Nuevo contacto a agregar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPost]
        public async Task<IActionResult> AddContact(Contact new_contact)
        {
            try
            {
                await _contactService.AddAsync(new_contact);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto a eliminar.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete("{contact_id}")]
        public async Task<IActionResult> RemoveContact(Guid contact_id)
        {
            try
            {
                await _contactService.RemoveAsync(contact_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edita un contacto por su ID.
        /// </summary>
        /// <param name="contact_id">ID del contacto a editar.</param>
        /// <param name="edited_contact">Contacto editado.</param>
        /// <returns>Estado de la operación.</returns>
        [HttpPut("{contact_id}")]
        public async Task<IActionResult> EditContact(Guid contact_id, Contact edited_contact)
        {
            try
            {
                await _contactService.EditAsync(contact_id, edited_contact);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Obtiene todos los contactos.
        /// </summary>
        /// <returns>La lista de todos los contactos.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            try
            {
                var contacts = await _contactService.GetAllAsync();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Elimina todos los contactos.
        /// </summary>
        /// <returns>Estado de la operación.</returns>
        [HttpDelete]
        public async Task<IActionResult> RemoveAllContacts()
        {
            try
            {
                await _contactService.RemoveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}