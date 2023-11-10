using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

public class User_Role : IdentityUserRole<Guid>, IRelationModel
{
    [JsonIgnore]
    public Guid Id1 { get { return UserId; } set { UserId = value; } }
    [JsonIgnore]
    public Guid Id2 { get { return RoleId; } set { RoleId = value; } }

    [JsonIgnore]
    public User? User { get; set; }
    [JsonIgnore]
    public Role? Role { get; set; }
}