using Labiofam.Models;
using Labiofam.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WebDbContext>(
    options => options.UseMySql(
        config.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection"))
    ));

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<WebDbContext>()
    .AddDefaultTokenProviders()
    .AddUserStore<UserStore<User, Role, WebDbContext, Guid>>()
    .AddRoleStore<RoleStore<Role, WebDbContext, Guid>>();

//Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebApp", builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    ));

//Entities Services
builder.Services.AddScoped<IRegistrationService<User, RegistrationModel>, UserService>();
builder.Services.AddScoped<IEntityService<Client>, ClientService>();
builder.Services.AddScoped<IEntityService<Product>, ProductService>();
builder.Services.AddScoped<IEntityService<Contact>, ContactService>();
builder.Services.AddScoped<IEntityService<Point_of_Sales>, POSService>();
builder.Services.AddScoped<IRegistrationService<Role, RoleModel>, RoleService>();
builder.Services.AddScoped<IEntityService<Service>, ServiceService>();

//Relationship Services
builder.Services.AddScoped<IRelationService<User_Role>, UserRoleService>();
builder.Services.AddScoped<IRelationService<Product_POS>, ProductPOSService>();
builder.Services.AddScoped<IRelationService<User_Product>, UserProductService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Usecors
app.UseCors("AllowWebApp");

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
