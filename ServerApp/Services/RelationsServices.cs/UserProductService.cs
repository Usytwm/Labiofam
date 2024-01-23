using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserProductService : RelationService<User_Product>, IRelationService<User_Product>
    {
        public UserProductService(WebDbContext webDbContext)
            : base(webDbContext) { }
    }
}