using Labiofam.Models;

namespace Labiofam.Services;

public class UserProductFilterService : 
    RelationFilterService<User_Product, User, Product>,
    IRelationFilter<User_Product, User, Product>
{
    public UserProductFilterService(WebDbContext webDbContext,
        IRelationService<User_Product> relationService)
        : base(webDbContext, relationService) { }
}