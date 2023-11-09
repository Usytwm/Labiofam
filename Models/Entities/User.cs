using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User : IdentityUser<Guid>, IEntityModel
{
    public string? Name { get { return UserName; } set { UserName = value; } }

    [JsonIgnore]
    public ICollection<User_Role>? Roles { get; set; }
    [JsonIgnore]
    public ICollection<User_Product>? Products { get; set; }
}