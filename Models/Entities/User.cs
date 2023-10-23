using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User : IdentityUser<Guid>
{
    public ICollection<User_Role>? Roles { get; set; }
    public ICollection<User_Product>? Products { get; set; }
}