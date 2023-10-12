using Microsoft.EntityFrameworkCore;

namespace Labiofam.Models;

public class WebDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public WebDbContext(IConfiguration configuration)
    { _configuration = configuration; }

    public DbSet<Client>? Clients { get; set; }
    public DbSet<Contact>? Contacts { get; set; }
    public DbSet<Point_of_Sales>? Points_Of_Sales { get; set; }
    public DbSet<Product>? Products { get; set; }
    public DbSet<Role>? Roles { get; set; }
    public DbSet<Service>? Services { get; set; }
    public DbSet<User>? Users { get; set; }
    public DbSet<Product_POS>? Product_POS { get; set; }
    public DbSet<User_Product>? User_Product { get; set; }
    public DbSet<User_Role>? User_Role { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product_POS>()
            .HasKey(ppv => new { ppv.Point_ID, ppv.Product_ID });

        modelBuilder.Entity<Product_POS>()
            .HasOne(ppos => ppos.Point_Of_Sales)
            .WithMany(pos => pos.Available_Products)
            .HasForeignKey(ppos => ppos.Point_ID);
        modelBuilder.Entity<Product_POS>()
            .HasOne(ppos => ppos.Product)
            .WithMany(p => p.Points_Of_Sales)
            .HasForeignKey(ppos => ppos.Product_ID);

        modelBuilder.Entity<User_Product>()
            .HasKey(up => new { up.User_ID, up.Product_ID });

        modelBuilder.Entity<User_Product>()
            .HasOne(up => up.Product)
            .WithMany(p => p.Users)
            .HasForeignKey(up => up.Product_ID);
        modelBuilder.Entity<User_Product>()
            .HasOne(up => up.User)
            .WithMany(u => u.Products)
            .HasForeignKey(up => up.User_ID);

        modelBuilder.Entity<User_Role>()
            .HasKey(ur => new { ur.User_ID, ur.Role_ID });

        modelBuilder.Entity<User_Role>()
            .HasOne(ur => ur.User)
            .WithMany(r => r.Roles)
            .HasForeignKey(ur => ur.User_ID);
        modelBuilder.Entity<User_Role>()
            .HasOne(ur => ur.Role)
            .WithMany(u => u.Users)
            .HasForeignKey(ur => ur.Role_ID);

        modelBuilder.Entity<Client>().ToTable("Clientes");
        modelBuilder.Entity<Contact>().ToTable("Contactos");
        modelBuilder.Entity<Point_of_Sales>().ToTable("PuntosDeVenta");
        modelBuilder.Entity<Product>().ToTable("Productos");
        modelBuilder.Entity<Role>().ToTable("Roles");
        modelBuilder.Entity<Service>().ToTable("Servicios");
        modelBuilder.Entity<User>().ToTable("Usuarios");
        modelBuilder.Entity<Product_POS>().ToTable("Producto_PuntoDeVenta");
        modelBuilder.Entity<User_Product>().ToTable("Usuario_Producto");
        modelBuilder.Entity<User_Role>().ToTable("Usuario_Rol");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
            //optionsBuilder.UseMySql((ServerVersion)_configuration.GetSection("ConnectionStrings:DefaultConnection"));
            optionsBuilder.UseMySql(_configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(_configuration.GetConnectionString("DefaultConnection")));

    }
}