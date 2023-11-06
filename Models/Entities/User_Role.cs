using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User_Role : IdentityUserRole<Guid>
{
    [JsonIgnore]
    public User? User { get; set; }
    [JsonIgnore]
    public Role? Role { get; set; }
}