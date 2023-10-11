using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labiofam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : Controller
    {
        private List<Persona> personas = new List<Persona>
            {
                new Persona { idUsuario = 1, username = "Usuario1", hashPassword = "Contraseña1" },
                new Persona { idUsuario = 2, username = "Usuario2", hashPassword = "Contraseña2" },
                new Persona { idUsuario = 3, username = "Usuario3", hashPassword = "Contraseña3" },
                new Persona { idUsuario = 4, username = "Usuario4", hashPassword = "Contraseña4" },
                new Persona { idUsuario = 5, username = "Usuario5", hashPassword = "Contraseña5" }
            };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(this.personas);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                Persona user = personas.First(x => x.idUsuario == id);
                return Ok(user);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                this.personas.RemoveAll(x => x.idUsuario == id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpPost]
        public IActionResult Post(Persona person)
        {
            try
            {
                this.personas.Add(person);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
