using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User_Role : IdentityUserRole<Guid>
{
    public User? User { get; set; }
    public Role? Role { get; set; }
}