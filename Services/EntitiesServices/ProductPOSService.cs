using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ProductPOSService : RelationService<Product_POS>,
        IRelationService<Product_POS>,
        IProductPOSService
    {
        private readonly WebDbContext _webDbContext;

        public ProductPOSService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene la relación entre un producto y un punto de venta por sus IDs.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <returns>La relación entre el producto y el punto de venta.</returns>
        public override async Task<Product_POS> GetAsync(Guid product_id, Guid pos_id)
        {
            var product_POS = await _webDbContext.Set<Product_POS>().FirstOrDefaultAsync(
                x => x.Product_ID.Equals(product_id) && x.Point_ID.Equals(pos_id)
            ) ?? throw new InvalidOperationException("Product_POS no encontrado");
            return product_POS;
        }

        /// <summary>
        /// Agrega una nueva relación entre un producto y un punto de venta.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        public override async Task AddAsync(Guid product_id, Guid pos_id)
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
        /// Método asincrónico para agregar una cantidad específica de un producto a un punto de venta.
        /// </summary>
        /// <param name="product_id">ID del producto.</param>
        /// <param name="pos_id">ID del punto de venta.</param>
        /// <param name="size">Tamaño/cantidad a agregar.</param>
        public async Task AddAsync(Guid product_id, Guid pos_id, int size)
        {
            try
            {
                var current_product_POS = await GetAsync(product_id, pos_id);
                current_product_POS.Cantidad += size;
            }
            catch
            {
                await _webDbContext.AddAsync(new Product_POS()
                {
                    Product_ID = product_id,
                    Point_ID = pos_id,
                    Cantidad = size
                });
            }
            await _webDbContext.SaveChangesAsync();
        }
    }
}