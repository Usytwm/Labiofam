namespace Labiofam.Models;

public class User_Role
{
    public Guid User_ID { get; set; }
    public Guid Role_ID { get; set; }
    public User? User { get; set; }
    public Role? Role { get; set; }
}