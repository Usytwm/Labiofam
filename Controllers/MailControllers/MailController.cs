using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labiofam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : Controller
    {
        private readonly IMailService _mailService;

        public MailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        /// <summary>
        /// Envia un correo electrónico con el asunto y el mensaje especificados.
        /// </summary>
        /// <param name="subject">Asunto del correo electrónico.</param>
        /// <param name="message">Mensaje del correo electrónico.</param>
        /// <returns>Respuesta HTTP 200 OK si se envía correctamente.</returns>
        [HttpPost("{subject}/{message}")]
        public async Task<IActionResult> SendMail(string subject, string message)
        {
            try
            {
                await _mailService.SendMailAsync(subject, message);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}