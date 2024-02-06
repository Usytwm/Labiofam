using Labiofam.Services;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Labiofam.Controllers
{
    /// <summary>
    /// Controlador de testimonios.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "superadmin,testimonios")]
    public class TestimonieController : EntityNoDTOController<Testimonie>
    {
        /// <summary>
        /// Constructor del controlador.
        /// </summary>
        /// <param name="entityService">Servicio de testimonios.</param>
        /// <param name="entityNoDTOService">Servicio sin DTO de testimonios.</param>
        public TestimonieController(
            IEntityService<Testimonie> entityService,
            IEntityNoDTOService<Testimonie> entityNoDTOService
            ) : base(entityService, entityNoDTOService) { }
    }
}