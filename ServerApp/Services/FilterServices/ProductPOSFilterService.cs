using Labiofam.Models;

namespace Labiofam.Services
{
    public class ProductPOSFilterService : RelationFilterService<Product_POS, Product, Point_of_Sales>,
        IRelationFilter<Product_POS, Product, Point_of_Sales>, IProductPOSFilter
    {
        private readonly IProductPOSService _relationService;

        public ProductPOSFilterService(
            WebDbContext webDbContext,
            IRelationService<Product_POS> relationService,
            IEntityService<Product> entityService1,
            IEntityService<Point_of_Sales> entityService2,
            IProductPOSService productPOSService
        ) : base(webDbContext, relationService, entityService1, entityService2)
        {
            _relationService = productPOSService;
        }

        /// <summary>
        /// Agrega una colección de productos a un punto de venta con tamaños específicos.
        /// </summary>
        /// <param name="id">ID del punto de venta.</param>
        /// <param name="entities">Colección de productos.</param>
        /// <param name="sizes">Colección de tamaños correspondientes a los productos.</param>
        public async Task AddType1ByType2Async(Guid id, ICollection<Product> entities, ICollection<int> sizes)
        {
            if (entities.Count != sizes.Count)
                throw new InvalidDataException();
            int index = 0;
            foreach (var product in entities)
            {
                try
                {
                    await _relationService.AddAsync(product.Id, id, sizes.ElementAt(index));
                    index++;
                }
                catch (IndexOutOfRangeException)
                {
                    throw new IndexOutOfRangeException();
                }
            }
        }
    }
}