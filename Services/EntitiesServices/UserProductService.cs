using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserProductService : IRelationService<User_Product>
    {
        private readonly WebDbContext _webDbContext;

        public UserProductService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene una relación entre usuario y producto por sus identificadores únicos.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="product_id">Identificador único del producto.</param>
        /// <returns>La relación entre usuario y producto encontrada.</returns>
        public async Task<User_Product> GetAsync(Guid user_id, Guid product_id)
        {
            var user_product = await _webDbContext.User_Product!.FirstOrDefaultAsync(
                x => x.User_ID.Equals(user_id) && x.Product_ID.Equals(product_id)
            ) ?? throw new InvalidOperationException("User_Product not found");
            return user_product;
        }

        /// <summary>
        /// Obtiene una lista de relaciones entre usuario y producto limitada por un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño máximo de la lista.</param>
        /// <returns>La lista de relaciones entre usuario y producto.</returns>
        public IEnumerable<User_Product> Take(int size) =>
            _webDbContext.User_Product!.Take(size);

        /// <summary>
        /// Agrega una nueva relación entre usuario y producto.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="product_id">Identificador único del producto.</param>
        public async Task AddAsync(Guid user_id, Guid product_id)
        {
            try
            {
                await GetAsync(user_id, product_id);
                throw new InvalidOperationException("The User_Product already exists");
            }
            catch
            {
                await _webDbContext.AddAsync(new User_Product()
                {
                    User_ID = user_id,
                    Product_ID = product_id
                });
                await _webDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Elimina una relación entre usuario y producto por sus identificadores únicos.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="product_id">Identificador único del producto.</param>
        public async Task RemoveAsync(Guid user_id, Guid product_id)
        {
            var current_user_product = await GetAsync(user_id, product_id);
            _webDbContext.Remove(current_user_product);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene una lista de todas las relaciones entre usuario y producto.
        /// </summary>
        /// <returns>La lista de relaciones entre usuario y producto.</returns>
        public async Task<List<User_Product>> GetAllAsync()
        {
            var user_product = await _webDbContext.User_Product!.ToListAsync();
            return user_product;
        }

        /// <summary>
        /// Elimina todas las relaciones entre usuario y producto.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.User_Product!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}