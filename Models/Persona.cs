namespace Labiofam.Models
{
    public class Persona
    {
        public Guid idUsuario { get; set; }
        public string? username { get; set; }

        public string? hashPassword { get; set; }
    }
}
