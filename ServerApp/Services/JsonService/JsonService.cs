using Labiofam.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Labiofam.Services
{
    public class JsonService : IJsonService
    {
        private readonly IWebHostEnvironment _enviroment;

        public JsonService(IWebHostEnvironment enviroment)
        {
            _enviroment = enviroment;
        }

        public ICollection<Province> JsonReader()
        {
            var filePath = Path.Combine(_enviroment.ContentRootPath, "Properties/provincias-municipios-cuba.json");
            string json = File.ReadAllText(filePath);

            JObject jsonObject = JObject.Parse(json);
            
            var result = new List<Province>();
            foreach (var node in jsonObject["Provincias"]!)
                result.Add(JsonConvert.DeserializeObject<Province>(node.ToString())!);
            try
            {
                return result;
            }
            catch
            {
                throw new ArgumentException("Something happened with the JsonFile");
            }
        }
    }
}