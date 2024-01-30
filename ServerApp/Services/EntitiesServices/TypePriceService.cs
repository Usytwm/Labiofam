using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class TypePriceService : EntityNoDTOService<Type_Price>,
        IEntityService<Type_Price>, IEntityNoDTOService<Type_Price>
    {
        private readonly WebDbContext _webDbContext;

        public TypePriceService(WebDbContext webDbContext)
            : base(webDbContext)
        {
            _webDbContext = webDbContext;
        }

        public override async Task EditAsync(Guid type_price_id, Type_Price edited_tp)
        {
            var current_tp = await GetAsync(type_price_id);
            current_tp.Type = edited_tp.Type;
            current_tp.Price = edited_tp.Price;

            _webDbContext.Entry(current_tp).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }
    }
}