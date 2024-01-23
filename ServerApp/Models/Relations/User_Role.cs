using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User_Role : IdentityUserRole<Guid>, IRelationDTO
{
    [JsonIgnore]
    public Guid Id1 { get { return UserId; } set { UserId = value; } }
    [JsonIgnore]
    public Guid Id2 { get { return RoleId; } set { RoleId = value; } }

    [JsonIgnore]
    public virtual User? User { get; set; }
    [JsonIgnore]
    public virtual Role? Role { get; set; }
}