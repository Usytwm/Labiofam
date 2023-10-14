// Importación de bibliotecas
using Labiofam.Models;
using Labiofam.Services;
using Microsoft.EntityFrameworkCore;

// Creación del constructor de la aplicación
var builder = WebApplication.CreateBuilder(args);

// Configuración de la aplicación para leer el archivo appsettings.json
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

// Agregar servicios al contenedor

// Agrega los controladores al contenedor
builder.Services.AddControllers();

// Agrega Swagger, una herramienta para documentar y probar APIs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agrega el contexto de la base de datos al contenedor. Aquí se configura para usar MySQL con la cadena de conexión obtenida del archivo appsettings.json
builder.Services.AddDbContext<WebDbContext>(options =>
    options.UseMySql(config.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection"))));

// Agrega soporte para CORS (Cross-Origin Resource Sharing), permitiendo que cualquier origen, encabezado y método accedan a la API
builder.Services.AddCors(options => options.AddPolicy("AllowWebApp", builder => builder
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod()));

// Agrega varios servicios al contenedor, como servicios para usuarios, clientes y productos
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IRoleService, RoleService>();

// Construcción de la aplicación con los servicios y configuraciones proporcionados
var app = builder.Build();

// Configuración del pipeline HTTP

// En entornos de desarrollo, se habilita Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Se habilita CORS con la política definida anteriormente
app.UseCors("AllowWebApp");

// Se redirigen todas las solicitudes HTTP a HTTPS
app.UseHttpsRedirection();

// Se habilita la autorización
app.UseAuthorization();

// Se mapean los controladores
app.MapControllers();

// Ejecución de la aplicación
app.Run();
