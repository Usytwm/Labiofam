using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class ProductService : EntityNoModelService<Product>,
        IEntityService<Product>, IEntityNoModelService<Product>
    {
        private readonly WebDbContext _webDbContext;

        public ProductService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Edita un producto por su ID.
        /// </summary>
        /// <param name="product_id">ID del producto a editar.</param>
        /// <param name="edited_Product">Producto editado.</param>
        public override async Task EditAsync(Guid product_id, Product edited_Product)
        {
            var current_product = await GetAsync(product_id);
            current_product.Name = edited_Product.Name;
            current_product.Description = edited_Product.Description;
            current_product.Image = edited_Product.Image;
            current_product.Summary = edited_Product.Summary;
            current_product.Advantages = edited_Product.Advantages;
            current_product.Diseases = edited_Product.Diseases;
            _webDbContext.Entry(current_product).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }
    }
}