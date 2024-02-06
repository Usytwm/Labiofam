using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    /// <summary>
    /// Servicio de Testimonios.
    /// </summary>
    public class TestimonieService : EntityNoDTOService<Testimonie>,
        IEntityService<Testimonie>, IEntityNoDTOService<Testimonie>
    {
        private readonly WebDbContext _webDbContext;

        /// <summary>
        /// Constructor del servicio.
        /// </summary>
        /// <param name="webDbContext">Contexto de la base de datos.</param>
        public TestimonieService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Edita un testimonio por su ID.
        /// </summary>
        /// <param name="testimonie_id">ID del testimonio a editar.</param>
        /// <param name="edited_testimonie">Testimonio editado.</param>
        public override async Task EditAsync(Guid testimonie_id, Testimonie edited_testimonie)
        {
            var current_testimonie = await GetAsync(testimonie_id);
            current_testimonie.Name = edited_testimonie.Name;
            current_testimonie.Image = edited_testimonie.Image;
            current_testimonie.Video_Url = edited_testimonie.Video_Url;
            _webDbContext.Entry(current_testimonie).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }
    }
}