using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Labiofam.Models;

public class Product : IEntityDTO
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    [StringLength(128)]
    public string? Name { get; set; }
    [Required]
    [StringLength(1024)]
    public string? Image { get; set; }
    [Required]
    [StringLength(2048)]
    public string? Description { get; set; }
    [Required]
    [StringLength(2048)]
    public string? Diseases { get; set; }
    [StringLength(2048)]
    public string? Advantages { get; set; }
    [StringLength(2048)]
    public string? ModeOfAction { get; set; }
    [StringLength(2048)]
    public string? ApplicationMode { get; set; }
    [StringLength(256)]
    public string? Stability { get; set; }
    [StringLength(2048)]
    public string? StorageStabilityConditions { get; set; }
    [StringLength(256)]
    public string? Presentation { get; set; }
    [StringLength(256)]
    public string? Dosage { get; set; }
    [StringLength(256)]
    public string? Compatibility { get; set; }
    [StringLength(256)]
    public string? Phytotoxicity { get; set; }
    [StringLength(256)]
    public string? Ph { get; set; }

    // Propiedad para almacenar datos en formato JSON
    [JsonIgnore]
    public string? DatosJson { get; set; }
    // Método para deserializar el JSON a un diccionario u otro tipo necesario
    [NotMapped]
    public Dictionary<string, string> Summary
    {
        get
        {
            if (string.IsNullOrEmpty(DatosJson))
                return new Dictionary<string, string>();
            try
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(DatosJson)!;
            }
            catch (Newtonsoft.Json.JsonReaderException)
            {
                return new Dictionary<string, string>();
            }
        }
        set
        {
            DatosJson = Newtonsoft.Json.JsonConvert.SerializeObject(value);
        }
    }

    [JsonIgnore]
    public virtual ICollection<Type_Product>? Types { get; set; }
    [JsonIgnore]
    public virtual ICollection<Product_POS>? Points_Of_Sales { get; set; }
    [JsonIgnore]
    public virtual ICollection<User_Product>? Users { get; set; }
}