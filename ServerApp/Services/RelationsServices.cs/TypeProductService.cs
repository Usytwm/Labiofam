using Labiofam.Models;

namespace Labiofam.Services
{
    public class TypeProductService : RelationService<Type_Product>, IRelationService<Type_Product>
    {
        public TypeProductService(WebDbContext webDbContext)
            : base(webDbContext) { }
    }
}