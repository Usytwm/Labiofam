namespace Labiofam.Services;

public interface IMailService
{
    Task SendMailAsync(string subject, string message);
}