using System.Text;
using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

// Agregar servicios al contenedor.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

        // Configurar autenticación JWT en Swagger
        var securityScheme = new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Description = "Bearer token",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        };
        options.AddSecurityDefinition("Bearer", securityScheme);

        var securityRequirement = new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        };
        options.AddSecurityRequirement(securityRequirement);
    });

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

builder.Services.AddAuthorization();

// Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebApp", builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    ));

// Servicios de entidades
builder.Services.AddScoped<IEntityService<User>, UserService>();
builder.Services.AddScoped<IEntityModelService<User, RegistrationModel>, UserService>();

builder.Services.AddScoped<IEntityService<Client>, ClientService>();
builder.Services.AddScoped<IEntityNoModelService<Client>, ClientService>();

builder.Services.AddScoped<IEntityService<Product>, ProductService>();
builder.Services.AddScoped<IEntityNoModelService<Product>, ProductService>();

builder.Services.AddScoped<IEntityService<Contact>, ContactService>();
builder.Services.AddScoped<IEntityNoModelService<Contact>, ContactService>();

builder.Services.AddScoped<IEntityService<Point_of_Sales>, POSService>();
builder.Services.AddScoped<IEntityNoModelService<Point_of_Sales>, POSService>();

builder.Services.AddScoped<IEntityService<Role>, RoleService>();
builder.Services.AddScoped<IEntityModelService<Role, RoleModel>, RoleService>();

builder.Services.AddScoped<IEntityService<Service>, ServiceService>();
builder.Services.AddScoped<IEntityNoModelService<Service>, ServiceService>();

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
// builder.Services.AddScoped<ISearchFilter, SearchFilterService>();
// builder.Services.AddScoped<IRelationSearchFilter, RelationSearchFilterService>();

// Servicio de correo
builder.Services.AddScoped<IMailService, MailService>();

// Servicio de files
builder.Services.AddScoped<IFileService, FileService>();

//Servicio de autenticacion
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1"
        ));
}
app.UseCors("AllowWebApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();