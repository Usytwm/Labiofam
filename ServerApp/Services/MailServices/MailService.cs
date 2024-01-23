using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Labiofam.Services
{
    /// <summary>
    /// Servicio para enviar correos electrónicos.
    /// </summary>
    public class MailService : IMailService
    {
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Constructor de la clase MailService.
        /// </summary>
        /// <param name="configuration">Configuración de la aplicación.</param>
        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Envía un correo electrónico asincrónicamente.
        /// </summary>
        /// <param name="subject">Asunto del correo electrónico.</param>
        /// <param name="message">Mensaje del correo electrónico.</param>
        public async Task SendMailAsync(string subject, string message)
        {
            string user = _configuration["MailSender"]!;
            string password = _configuration["PasswordSender"]!;
            var smtpClient = new SmtpClient();
            smtpClient.Connect("smtp.office365.com", 587, SecureSocketOptions.StartTls);
            smtpClient.Authenticate(user, password);
            MimeMessage mail = new();
            mail.From.Add(new MailboxAddress(user, user));
            mail.To.Add(new MailboxAddress(
                _configuration["MailRecipient"],
                _configuration["MailRecipient"]
            ));
            mail.Subject = subject;
            mail.Body = new TextPart("plain") { Text = message };
            await smtpClient.SendAsync(mail);
        }
    }
}