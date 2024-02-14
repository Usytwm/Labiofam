using Microsoft.AspNetCore.Identity;

namespace Labiofam.Models;

#pragma warning disable CS1591 // Falta el comentario XML para el tipo o miembro visible públicamente
public class DataSeed
#pragma warning restore CS1591 // Falta el comentario XML para el tipo o miembro visible públicamente
{
#pragma warning disable CS1591 // Falta el comentario XML para el tipo o miembro visible públicamente
    public static async void Initialize(IServiceScopeFactory serviceScopeFactory)
#pragma warning restore CS1591 // Falta el comentario XML para el tipo o miembro visible públicamente
    {
        using var scope = serviceScopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetService<WebDbContext>();

        if (context!.Users.Any())
            return;

        var userManager = scope.ServiceProvider.GetService<UserManager<User>>();
        var admin_user = new User()
        {
            Id = Guid.NewGuid(),
            Name = "superadmin",
            Email = "admin@host.db",
        };
        await userManager!.CreateAsync(admin_user, "H0t.sauce");

        var roleManager = scope.ServiceProvider.GetService<RoleManager<Role>>();
        var admin_role = new Role()
        {
            Id = Guid.NewGuid(),
            Name = "superadmin",
            Description = "Puede hacer todas las operaciones CRUD."
        };
        await roleManager!.CreateAsync(admin_role);

        await context.AddAsync(new User_Role()
        {
            Id1 = admin_user.Id,
            Id2 = admin_role.Id
        });

        var environment = scope.ServiceProvider.GetService<IWebHostEnvironment>();
        var filePath = Path.Combine(environment!.ContentRootPath, "Properties/data.json");
        string json = File.ReadAllText(filePath);
        dynamic data = Newtonsoft.Json.JsonConvert.DeserializeObject(json)!;

        var products = new List<Product>();

        foreach (var item in data.productos)
        {
            var product = new Product
            {
                Id = (Guid)item["Id"],
                Name = item["Nombre"] ?? default,
                Type_of_Product = item["Tipo"] ?? default,
                Image = item["Imagen"] ?? default,
                Description = item["Descripción"] ?? default,
                Diseases = item["Enfermedades que controla"] ?? default,
                Advantages = item["Ventajas"] ?? default,
                DatosJson = Newtonsoft.Json.JsonConvert.SerializeObject(item["Otros"]) ?? default
            };
            products.Add(product);

            await context.AddAsync(product);
        }
        foreach (var item in data.precios)
        {
            foreach (var relation in item.relacion)
            {
                var type_price = new Type_Price
                {
                    Type = item["tipo"] ?? default,
                    Capacity = relation["capacidad"] ?? default,
                    Price = relation["costo"] ?? default
                };

                await context.AddAsync(type_price);

                if (item["Id_producto"] is not null)
                {
                    string aux = item["Id_producto"];
                    var product = products.Find(x => x.Id.ToString().Equals(aux));
                    await context.AddAsync(new Type_Product
                    {
                        Id1 = type_price.Id,
                        Id2 = product!.Id
                    });
                }
            }
        }

        var roles = new List<Role>(){
                new()
                {
                    Name = "bioproductos",
                    Description = "Puede hacer las operaciones CUD (create, update, delete)"
                        + "sobre las tablas Productos y TiposPrecios."
                },
                new()
                {
                    Name = "establecimientos",
                    Description = "Puede hacer las operaciones CUD (create, update, delete)"
                        + "sobre la tabla PuntosDeVenta."
                },
                new()
                {
                    Name = "ventas",
                    Description = "Puede hacer las operaciones CUD (create, update, delete)"
                        + "sobre la tabla Productos_PuntosDeVenta."
                },
                new()
                {
                    Name = "testimonios",
                    Description = "Puede hacer las operaciones CUD (create, update, delete)"
                        + "sobre la tabla Testimonios."
                }
            };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        await context.SaveChangesAsync();
    }
}
