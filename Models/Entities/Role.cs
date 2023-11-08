using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class Role : IdentityRole<Guid>
{
    public string? Description { get; set; }

    [JsonIgnore]
    public ICollection<User_Role>? Users { get; set; }
}