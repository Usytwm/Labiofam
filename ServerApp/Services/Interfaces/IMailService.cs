namespace Labiofam.Services;

    public interface IMailService
    {
        /// <summary>
        /// Envía un correo electrónico de forma asíncrona.
        /// </summary>
        /// <param name="subject">Asunto del correo electrónico.</param>
        /// <param name="message">Mensaje del correo electrónico.</param>
        Task SendMailAsync(string sender_name, string sender_email, string subject, string message);
    }