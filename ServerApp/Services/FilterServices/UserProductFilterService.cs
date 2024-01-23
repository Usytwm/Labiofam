using Labiofam.Models;

namespace Labiofam.Services;

public class UserProductFilterService :
    RelationFilterService<User_Product, User, Product>,
    IRelationFilter<User_Product, User, Product>
{
    public UserProductFilterService(
        WebDbContext webDbContext,
        IRelationService<User_Product> relationService,
        IEntityService<User> entityService1,
        IEntityService<Product> entityService2
        ) : base(webDbContext, relationService, entityService1, entityService2) { }
}