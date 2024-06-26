using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
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
        });
        c.IncludeXmlComments(Path.Combine(
            Directory.GetCurrentDirectory(),
            "bin/Debug/net7.0/Labiofam.xml"
            ));
    });

// Agregar el contexto de base de datos como servicio.
builder.Services.AddDbContext<WebDbContext>(options =>
    {
        options.UseMySql(config.GetConnectionString("DefaultConnection"),
            ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection")));
    }, ServiceLifetime.Scoped);

// Agregar las clases User y Role usando el paquete Identity de .Net Core
builder.Services.AddIdentity<User, Role>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireDigit = true;

        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<WebDbContext>()
    .AddDefaultTokenProviders()
    .AddUserStore<UserStore<User, Role, WebDbContext, Guid>>()
    .AddRoleStore<RoleStore<Role, WebDbContext, Guid>>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateAudience = true,
            ValidAudience = config.GetSection("JWT")["Audience"],
            ValidateIssuer = true,
            ValidIssuer = config.GetSection("JWT")["Issuer"],
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(config.GetSection("JWT")["Key"]!))
        };
    });

builder.Services.AddAuthorization(options =>
    {
        options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    });

builder.Services.ConfigureApplicationCookie(options =>
    {
        options.LoginPath = "/api/Registration/login";
    });

// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        build => build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


// Servicios de entidades
builder.Services.AddScoped<IEntityService<User>, UserService>();
builder.Services.AddScoped<IEntityDTOService<User, RegistrationDTO>, UserService>();

builder.Services.AddScoped<IEntityService<Product>, ProductService>();
builder.Services.AddScoped<IEntityDTOService<Product, ProductDTO>, ProductService>();

builder.Services.AddScoped<IEntityService<Contact>, ContactService>();
builder.Services.AddScoped<IEntityNoDTOService<Contact>, ContactService>();

builder.Services.AddScoped<IEntityService<Point_of_Sales>, POSService>();
builder.Services.AddScoped<IEntityNoDTOService<Point_of_Sales>, POSService>();

builder.Services.AddScoped<IEntityService<Role>, RoleService>();
builder.Services.AddScoped<IEntityDTOService<Role, RoleDTO>, RoleService>();

builder.Services.AddScoped<IEntityService<Service>, ServiceService>();
builder.Services.AddScoped<IEntityNoDTOService<Service>, ServiceService>();

builder.Services.AddScoped<IEntityService<Type_Price>, TypePriceService>();
builder.Services.AddScoped<IEntityNoDTOService<Type_Price>, TypePriceService>();

builder.Services.AddScoped<IEntityService<Testimonie>, TestimonieService>();
builder.Services.AddScoped<IEntityNoDTOService<Testimonie>, TestimonieService>();

// Servicios de relaciones
builder.Services.AddScoped<IRelationService<User_Role>, UserRoleService>();

builder.Services.AddScoped<IRelationService<User_Product>, UserProductService>();

builder.Services.AddScoped<IRelationService<Product_POS>, ProductPOSService>();
builder.Services.AddScoped<IProductPOSService, ProductPOSService>();

builder.Services.AddScoped<IRelationService<Type_Product>, TypeProductService>();

// Servicios de filtrado
builder.Services.AddScoped<IRelationFilter<User_Role, User, Role>, UserRoleFilterService>();
builder.Services.AddScoped<IRelationFilter<User_Product, User, Product>, UserProductFilterService>();
builder.Services.AddScoped<IRelationFilter<Product_POS, Product, Point_of_Sales>, ProductPOSFilterService>();
builder.Services.AddScoped<IProductPOSFilter, ProductPOSFilterService>();
builder.Services.AddScoped<IRelationFilter<Type_Product, Type_Price, Product>, TypeProductFilterService>();

// Servicio de correo
builder.Services.AddScoped<IMailService, MailService>();

// Servicio de imagenes
builder.Services.AddScoped<IImageService, ImageService>();

// Servicio de autenticacion
builder.Services.AddSingleton<IJWTService, JWTService>();

// Servicio de json
builder.Services.AddScoped<IJsonService, JsonService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var serviceScopeFactory = scope.ServiceProvider
        .GetRequiredService<IServiceScopeFactory>();
    DataSeed.Initialize(serviceScopeFactory);
}

//app.UseHsts();
//app.UseHttpsRedirection();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
app.UseRouting();
app.UseCors("AllowAnyOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();