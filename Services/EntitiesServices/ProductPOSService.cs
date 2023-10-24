using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ProductPOSService : IRelationService<Product_POS>
    {
        private readonly WebDbContext _webDbContext;

        public ProductPOSService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene la relación entre un producto y un punto de venta por sus IDs.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <returns>La relación entre el producto y el punto de venta.</returns>
        public async Task<Product_POS> GetAsync(Guid product_id, Guid pos_id)
        {
            var product_POS = await _webDbContext.Product_POS!.FirstOrDefaultAsync(
                x => x.Product_ID.Equals(product_id) && x.Point_ID.Equals(pos_id)
            ) ?? throw new InvalidOperationException("Product_POS no encontrado");
            return product_POS;
        }

        /// <summary>
        /// Obtiene una lista de relaciones entre productos y puntos de venta limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de relaciones.</param>
        /// <returns>La lista de relaciones entre productos y puntos de venta.</returns>
        public IEnumerable<Product_POS> Take(int size) =>
            _webDbContext.Product_POS!.Take(size);

        /// <summary>
        /// Agrega una nueva relación entre un producto y un punto de venta.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        public async Task AddAsync(Guid product_id, Guid pos_id)
        {
            try
            {
                var current_product_POS = await GetAsync(product_id, pos_id);
                current_product_POS.Cantidad += 1;
            }
            catch
            {
                await _webDbContext.AddAsync(new Product_POS()
                {
                    Product_ID = product_id,
                    Point_ID = pos_id,
                    Cantidad = 1
                });
            }
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina una relación entre un producto y un punto de venta por sus IDs.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        public async Task RemoveAsync(Guid product_id, Guid pos_id)
        {
            var current_product_pos = await GetAsync(product_id, pos_id);
            _webDbContext.Remove(current_product_pos);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene todas las relaciones entre productos y puntos de venta.
        /// </summary>
        /// <returns>La lista de todas las relaciones.</returns>
        public async Task<List<Product_POS>> GetAllAsync()
        {
            var product_POS = await _webDbContext.Product_POS!.ToListAsync();
            return product_POS;
        }

        /// <summary>
        /// Elimina todas las relaciones entre productos y puntos de venta.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Product_POS!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}