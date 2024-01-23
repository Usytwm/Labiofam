using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
builder.Services.AddDbContext<WebDbContext>(options =>
    {
        options.UseMySql(config.GetConnectionString("DefaultConnection"),
            ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection")));
    });

// Agregar las clases User y Role usando el paquete Identity de .Net Core
builder.Services.AddIdentity<User, Role>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireDigit = false;
        options.Password.RequiredUniqueChars = 2;

        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<WebDbContext>()
    .AddDefaultTokenProviders()
    .AddUserStore<UserStore<User, Role, WebDbContext, Guid>>()
    .AddRoleStore<RoleStore<Role, WebDbContext, Guid>>();

builder.Services.AddAuthorization(options =>
    {
        options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    });

builder.Services.ConfigureApplicationCookie(options =>
    {
        options.LoginPath = "/api/Registration/login";
    });

// Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebApp", builder => builder
    .WithOrigins(new[]
    {
        "http://localhost:4200",
        "http://localhost:5263",
        "https://localhost:7136",
        "http://localhost:46423"
    })
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    ));

// Servicios de entidades
builder.Services.AddScoped<IEntityService<User>, UserService>();
builder.Services.AddScoped<IEntityDTOService<User, RegistrationDTO>, UserService>();

builder.Services.AddScoped<IEntityService<Product>, ProductService>();
builder.Services.AddScoped<IEntityNoDTOService<Product>, ProductService>();

builder.Services.AddScoped<IEntityService<Contact>, ContactService>();
builder.Services.AddScoped<IEntityNoDTOService<Contact>, ContactService>();

builder.Services.AddScoped<IEntityService<Point_of_Sales>, POSService>();
builder.Services.AddScoped<IEntityNoDTOService<Point_of_Sales>, POSService>();

builder.Services.AddScoped<IEntityService<Role>, RoleService>();
builder.Services.AddScoped<IEntityDTOService<Role, RoleDTO>, RoleService>();

builder.Services.AddScoped<IEntityService<Service>, ServiceService>();
builder.Services.AddScoped<IEntityNoDTOService<Service>, ServiceService>();

// Servicios de relaciones
builder.Services.AddScoped<IRelationService<User_Role>, UserRoleService>();

builder.Services.AddScoped<IRelationService<User_Product>, UserProductService>();

builder.Services.AddScoped<IRelationService<Product_POS>, ProductPOSService>();
builder.Services.AddScoped<IProductPOSService, ProductPOSService>();

// Servicios de filtrado
builder.Services.AddScoped<IRelationFilter<User_Role, User, Role>, UserRoleFilterService>();
builder.Services.AddScoped<IRelationFilter<User_Product, User, Product>, UserProductFilterService>();
builder.Services.AddScoped<IRelationFilter<Product_POS, Product, Point_of_Sales>, ProductPOSFilterService>();
builder.Services.AddScoped<IProductPOSFilter, ProductPOSFilterService>();

// Servicio de correo
builder.Services.AddScoped<IMailService, MailService>();

// Servicio de files
builder.Services.AddScoped<IImageService, ImageService>();

var app = builder.Build();

app.UseHsts();
app.UseHttpsRedirection();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
app.UseCors("AllowWebApp");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();