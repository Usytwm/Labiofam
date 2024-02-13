using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Models
{
    /// <summary>
    /// Contexto de la base de datos.
    /// </summary>
    public class WebDbContext : IdentityDbContext<User, Role, Guid>
    {
        /// <summary>
        /// Constructor del contexto.
        /// </summary>
        /// <param name="options">Opciones del contexto.</param>
        public WebDbContext(DbContextOptions options) : base(options) { }

        /// <summary>
        /// Tabla de Contactos.
        /// </summary>
        public DbSet<Contact>? Contacts { get; set; }
        /// <summary>
        /// Tabla de Puntos de venta.
        /// </summary>
        public DbSet<Point_of_Sales>? Points_Of_Sales { get; set; }
        /// <summary>
        /// Tabla de Productos.
        /// </summary>
        public DbSet<Product>? Products { get; set; }
        /// <summary>
        /// Tabla de Tipos y Precios.
        /// </summary>
        public DbSet<Type_Price> Type_Prices { get; set; }
        /// <summary>
        /// Tabla de Servicios.
        /// </summary>
        public DbSet<Service>? Services { get; set; }
        /// <summary>
        /// Tabla de Relaciones Producto/Punto de venta.
        /// </summary>
        public DbSet<Product_POS>? Product_POS { get; set; }
        /// <summary>
        /// Tabla de Relaciones Usuario/Producto.
        /// </summary>
        public DbSet<User_Product>? User_Product { get; set; }
        /// <summary>
        /// Tabla de Relaciones Usuario/Rol.
        /// </summary>
        public DbSet<User_Role>? User_Role { get; set; }
        /// <summary>
        /// Tabla de Relaciones Tipo_Precio/Producto.
        /// </summary>
        public DbSet<Type_Product>? Type_Product { get; set; }
        /// <summary>
        /// Tabla de Relaciones Tipo_Precio/Producto.
        /// </summary>
        public DbSet<Testimonie>? Testimonies { get; set; }

        /// <summary>
        /// Propiedades de inicialización de la base de datos.
        /// </summary>
        /// <param name="modelBuilder">Modelo de creación de la base de datos.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Type_Price>()
                .Property(t => t.Name)
                .HasColumnName("Name");

            // Definición de las relaciones y claves primarias compuestas
            modelBuilder.Entity<Type_Product>()
                .HasKey(tp => new { tp.Id1, tp.Id2 });

            modelBuilder.Entity<Type_Product>()
                .HasOne(p => p.Product)
                .WithMany(tp => tp.Types)
                .HasForeignKey(tp => tp.Id2);

            modelBuilder.Entity<Type_Product>()
                .HasOne(t => t.Type_Price)
                .WithOne(tp => tp.Product)
                .HasForeignKey<Type_Product>(tp => tp.Id1);

            modelBuilder.Entity<Product_POS>()
                .HasKey(ppv => new { ppv.Id1, ppv.Id2 });

            modelBuilder.Entity<Product_POS>()
                .HasOne(ppos => ppos.Point_Of_Sales)
                .WithMany(pos => pos.Available_Products)
                .HasForeignKey(ppos => ppos.Id2);

            modelBuilder.Entity<Product_POS>()
                .HasOne(ppos => ppos.Product)
                .WithMany(p => p.Points_Of_Sales)
                .HasForeignKey(ppos => ppos.Id1);

            modelBuilder.Entity<User_Product>()
                .HasKey(up => new { up.Id1, up.Id2 });

            modelBuilder.Entity<User_Product>()
                .HasOne(up => up.Product)
                .WithMany(p => p.Users)
                .HasForeignKey(up => up.Id2);

            modelBuilder.Entity<User_Product>()
                .HasOne(up => up.User)
                .WithMany(u => u.Products)
                .HasForeignKey(up => up.Id1);

            modelBuilder.Entity<IdentityUserLogin<Guid>>()
                .HasKey(key => key.ProviderKey);

            modelBuilder.Entity<IdentityUserRole<Guid>>()
                .HasKey(key => new { key.UserId, key.RoleId });

            modelBuilder.Entity<IdentityUserToken<Guid>>()
                .HasKey(key => key.UserId);

            modelBuilder.Entity<User_Role>()
                .HasOne(ur => ur.User)
                .WithMany(r => r.Roles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<User_Role>()
                .HasOne(ur => ur.Role)
                .WithMany(u => u.Users)
                .HasForeignKey(ur => ur.RoleId);

            // Definición de nombres de tablas personalizados
            modelBuilder.Entity<Contact>().ToTable("Contactos");
            modelBuilder.Entity<Point_of_Sales>().ToTable("PuntosDeVenta");
            modelBuilder.Entity<Product>().ToTable("Productos");
            modelBuilder.Entity<Type_Price>().ToTable("TiposPrecios");
            modelBuilder.Entity<Role>().ToTable("Roles");
            modelBuilder.Entity<Service>().ToTable("Servicios");
            modelBuilder.Entity<User>().ToTable("Usuarios");
            modelBuilder.Entity<Product_POS>().ToTable("Producto_PuntoDeVenta");
            modelBuilder.Entity<User_Product>().ToTable("Usuario_Producto");
            modelBuilder.Entity<User_Role>().ToTable("Usuario_Rol");
            modelBuilder.Entity<Type_Product>().ToTable("Tipo_Producto");
            modelBuilder.Entity<Testimonie>().ToTable("Testimonios");
        }
    }
}