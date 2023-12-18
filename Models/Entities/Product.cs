using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Linq;

namespace Labiofam.Models;

public class Product : IEntityModel
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(64)]
    public string? Name { get; set; }
    public string? Image { get; set; }
    public string? Description { get; set; }
    public string? Diseases { get; set; }
    public string? Advantages { get; set; }
    public string? Summary { get; set; } /////////////////////////////

    private string? _extraField;

    public string? ExtraField
    {
        get => _extraField;
        set => _extraField = value;
    }

    [NotMapped]
    public Dictionary<string, string> ExtendedData
    {
        get
        {
            if (string.IsNullOrEmpty(_extraField))
            {
                return new Dictionary<string, string>();
            }

            try
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(_extraField)!;
            }
            catch (Newtonsoft.Json.JsonReaderException)
            {
                // Log the error or handle it as appropriate for your application.
                return new Dictionary<string, string>();
            }
        }
        set
        {
            _extraField = Newtonsoft.Json.JsonConvert.SerializeObject(value);
        }
    }

    [JsonIgnore]
    public ICollection<Product_POS>? Points_Of_Sales { get; set; }
    [JsonIgnore]
    public ICollection<User_Product>? Users { get; set; }
}