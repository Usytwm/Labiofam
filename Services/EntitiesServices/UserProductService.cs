using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserProductService : RelationService<User_Product>, IRelationService<User_Product>
    {
        private readonly WebDbContext _webDbContext;

        public UserProductService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene una relación entre usuario y producto por sus identificadores únicos.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="product_id">Identificador único del producto.</param>
        /// <returns>La relación entre usuario y producto encontrada.</returns>
        public override async Task<User_Product> GetAsync(Guid user_id, Guid product_id)
        {
            var user_product = await _webDbContext.Set<User_Product>().FirstOrDefaultAsync(
                x => x.User_ID.Equals(user_id) && x.Product_ID.Equals(product_id)
            ) ?? throw new InvalidOperationException("User_Product not found");
            return user_product;
        }

        /// <summary>
        /// Agrega una nueva relación entre usuario y producto.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <param name="product_id">Identificador único del producto.</param>
        public override async Task AddAsync(Guid user_id, Guid product_id)
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
    }
}