using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

///nuevo para agregar jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = "{AUTH0_DOMAIN}";
    options.Audience = "{AUTH0_AUDIENCE}";
});
///end


var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

// Agregar servicios al contenedor.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agregar el contexto de base de datos como servicio.
builder.Services.AddDbContext<WebDbContext>(
    options => options.UseMySql(
        config.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection"))
    ));

// Agregar las clases User y Role usando el paquete Identity de .Net Core
builder.Services.AddIdentity<User, Role>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireDigit = false;
        options.Password.RequiredUniqueChars = 2;
    })
    .AddEntityFrameworkStores<WebDbContext>()
    .AddDefaultTokenProviders()
    .AddUserStore<UserStore<User, Role, WebDbContext, Guid>>()
    .AddRoleStore<RoleStore<Role, WebDbContext, Guid>>();

// Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebApp", builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    ));

// Servicios de entidades
builder.Services.AddScoped<IRegistrationService<User, RegistrationModel>, UserService>();
builder.Services.AddScoped<IEntityService<Client>, ClientService>();
builder.Services.AddScoped<IEntityService<Product>, ProductService>();
builder.Services.AddScoped<IEntityService<Contact>, ContactService>();
builder.Services.AddScoped<IEntityService<Point_of_Sales>, POSService>();
builder.Services.AddScoped<IRegistrationService<Role, RoleModel>, RoleService>();
builder.Services.AddScoped<IEntityService<Service>, ServiceService>();
builder.Services.AddScoped<RoleService>();//inyeccion de dependencia

// Servicios de relaciones
builder.Services.AddScoped<IRelationService<User_Role>, UserRoleService>();
builder.Services.AddScoped<IProductPOSService, ProductPOSService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowWebApp");
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();
app.Run();