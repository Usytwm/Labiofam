using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User : IdentityUser<Guid>, IEntityDTO
{
    public string? Name { get { return UserName; } set { UserName = value; } }
    [StringLength(1024)]
    public string? Image { get; set; }

    [JsonIgnore]
    public virtual ICollection<User_Role>? Roles { get; set; }
    [JsonIgnore]
    public virtual ICollection<User_Product>? Products { get; set; }

}