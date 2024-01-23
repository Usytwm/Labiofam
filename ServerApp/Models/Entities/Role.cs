using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class Role : IdentityRole<Guid>, IEntityDTO
{
    [StringLength(1024)]
    public string? Description { get; set; }

    [JsonIgnore]
    public virtual ICollection<User_Role>? Users { get; set; }
}