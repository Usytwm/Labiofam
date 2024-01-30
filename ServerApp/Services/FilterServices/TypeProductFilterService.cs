using Labiofam.Models;

namespace Labiofam.Services
{
    public class TypeProductFilterService :
        RelationFilterService<Type_Product, Type_Price, Product>,
        IRelationFilter<Type_Product, Type_Price, Product>
    {
        public TypeProductFilterService(
            WebDbContext webDbContext,
            IRelationService<Type_Product> relationService,
            IEntityService<Type_Price> entityService1,
            IEntityService<Product> entityService2
            ) : base(webDbContext, relationService, entityService1, entityService2) { }
    }
}