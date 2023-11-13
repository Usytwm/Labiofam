namespace Labiofam.Services;

using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

public class MailService : IMailService
{
    private readonly IConfiguration _configuration;
    public MailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

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
        mail.Body = new TextPart("plain"){ Text = message };

        await smtpClient.SendAsync(mail);
    }
}