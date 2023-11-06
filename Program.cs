using System.Text;
using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
                    )
            };
    });

builder.Services.AddAuthorization(options =>
    options.AddPolicy("superadmin", policy => policy.RequireRole("superadmin"))
    );

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

// Servicios de relaciones
builder.Services.AddScoped<IRelationService<User_Role>, UserRoleService>();
builder.Services.AddScoped<IProductPOSService, ProductPOSService>();
builder.Services.AddScoped<IRelationService<User_Product>, UserProductService>();

// Servicios de filtrado
builder.Services.AddScoped<IRelationFilter, RelationFilterService>();
builder.Services.AddScoped<ISearchFilter, SearchFilterService>();

var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowWebApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();