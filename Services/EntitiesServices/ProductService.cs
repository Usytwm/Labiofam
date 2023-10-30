using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ProductService : IEntityService<Product>
    {
        private readonly WebDbContext _webDbContext;

        public ProductService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <returns>El producto encontrado.</returns>
        public async Task<Product> GetAsync(Guid product_id)
        {
            var current_product = await _webDbContext.FindAsync<Product>(product_id)
                ?? throw new InvalidOperationException("Producto no encontrado");
            return current_product;
        }

        /// <summary>
        /// Obtiene un producto por su nombre.
        /// </summary>
        /// <param name="product_name">Nombre del producto.</param>
        /// <returns>El producto encontrado.</returns>
        public async Task<Product> GetAsync(string product_name)
        {
            var current_product = await _webDbContext.Products!.FirstOrDefaultAsync(
                x => x.Name!.Equals(product_name)
            ) ?? throw new InvalidOperationException("Producto no encontrado");
            return current_product;
        }

        /// <summary>
        /// Obtiene una lista de productos limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de productos.</param>
        /// <returns>La lista de productos.</returns>
        public IEnumerable<Product> Take(int size) =>
            _webDbContext.Products!.OrderBy(x => x.Name).Take(size);

        /// <summary>
        /// Agrega un nuevo producto.
        /// </summary>
        /// <param name="new_product">Nuevo producto a agregar.</param>
        public async Task AddAsync(Product new_product)
        {
            if (await _webDbContext.Products!.AnyAsync(product => product.Name!.Equals(new_product.Name)))
                throw new InvalidOperationException("El producto ya existe");

            await _webDbContext.AddAsync(new_product);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto a eliminar.</param>
        public async Task RemoveAsync(Guid product_id)
        {
            var current_product = await GetAsync(product_id);
            _webDbContext.Remove(current_product);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Edita un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto a editar.</param>
        /// <param name="edited_Product">Producto editado.</param>
        public async Task EditAsync(Guid product_id, Product edited_Product)
        {
            var current_product = await GetAsync(product_id);
            current_product.Name = edited_Product.Name;
            current_product.Type = edited_Product.Type;
            current_product.Image = edited_Product.Image;
            current_product.Summary = edited_Product.Summary;
            current_product.Specifications = edited_Product.Specifications;
            _webDbContext.Entry(current_product).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene todos los productos.
        /// </summary>
        /// <returns>La lista de todos los productos.</returns>
        public async Task<List<Product>> GetAllAsync()
        {
            var products = await _webDbContext.Products!.ToListAsync();
            return products;
        }

        /// <summary>
        /// Elimina todos los productos.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Products!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}