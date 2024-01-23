using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Labiofam.Models;

public class Product : IEntityDTO
{
    [Key]
    public Guid Id { get; set; }
    [StringLength(128)]
    public string? Name { get; set; }
    [StringLength(1024)]
    public string? Image { get; set; }
    [StringLength(2048)]
    public string? Description { get; set; }
    [StringLength(2048)]
    public string? Diseases { get; set; }
    [StringLength(2048)]
    public string? Advantages { get; set; }
    [StringLength(8192)]
    public string? Summary { get { return _summary; } set { _summary = value; } }

    private string? _summary;
    [NotMapped]
    public Dictionary<string, string> ExtendedData
    {
        get
        {
            if (string.IsNullOrEmpty(_summary))
                return new Dictionary<string, string>();
            else try
            {
                return JsonConvert.DeserializeObject<Dictionary<string, string>>(_summary)!;
            }
            catch (JsonReaderException)
            {
                // Log the error or handle it as appropriate for your application.
                return new Dictionary<string, string>();
            }
        }
        set
        {
            _summary = JsonConvert.SerializeObject(value);
        }
    }

    [JsonIgnore]
    public virtual ICollection<Product_POS>? Points_Of_Sales { get; set; }
    [JsonIgnore]
    public virtual ICollection<User_Product>? Users { get; set; }
}