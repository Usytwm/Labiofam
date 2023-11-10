using Labiofam.Models;

namespace Labiofam.Services;

public class ProductPOSFilterService :
    RelationFilterService<Product_POS, Product, Point_of_Sales>,
    IRelationFilter<Product_POS, Product, Point_of_Sales>,
    IProductPOSFilter
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

    public async Task AddType1ByType2(Guid id, ICollection<(Product, int)> entities)
    {
        foreach (var product in entities)
        {
            try { await _relationService.AddAsync(product.Item1.Id, id, product.Item2); }
            catch { continue; }
        }
    }
}