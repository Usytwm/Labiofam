using Labiofam.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Labiofam.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MailController : Controller
{
    private readonly IMailService _mailService;

    public MailController(IMailService mailService)
    {
        _mailService = mailService;
    }
    [HttpPost("{subject}/{message}")]
    public async Task<IActionResult> SendMail(string subject, string message)
    {
        try {
            await _mailService.SendMailAsync(subject, message);
            return Ok();
        } catch {
            return BadRequest();
        }
    }
    [HttpGet]
    public IActionResult NameApp()
    {
        var appName = Assembly.GetEntryAssembly()!.GetName().Name;
        return Ok(appName);
    }
}