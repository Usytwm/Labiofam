using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    /// <summary>
    /// Servicio abstracto para filtrar relaciones entre entidades.
    /// </summary>
    /// <typeparam name="T">El tipo de modelo de relación.</typeparam>
    /// <typeparam name="T1">El tipo de modelo de entidad 1.</typeparam>
    /// <typeparam name="T2">El tipo de modelo de entidad 2.</typeparam>
    public abstract class RelationFilterService<T, T1, T2>
        where T : class, IRelationModel, new()
        where T1 : class, IEntityModel
        where T2 : class, IEntityModel
    {
        private readonly WebDbContext _webDbContext;
        private readonly IRelationService<T> _relationService;

        /// <summary>
        /// Crea una nueva instancia de la clase <see cref="RelationFilterService{T, T1, T2}"/>.
        /// </summary>
        /// <param name="webDbContext">El contexto de base de datos web.</param>
        /// <param name="relationService">El servicio de relación.</param>
        public RelationFilterService(WebDbContext webDbContext,
            IRelationService<T> relationService)
        {
            _webDbContext = webDbContext;
            _relationService = relationService;
        }

        /// <summary>
        /// Obtiene una lista de entidades de tipo 2 por tipo 1.
        /// </summary>
        /// <param name="id">El ID de tipo 1.</param>
        /// <returns>Una lista de entidades de tipo 2.</returns>
        public async Task<ICollection<T2>> GetType2ByType1(Guid id)
        {
            var type1_id = await _webDbContext.Set<T>()
                .Where(ur => ur.Id1 == id)
                .ToListAsync();
            var result = new List<T2>();
            foreach (var item in type1_id)
            {
                result.Add(await _webDbContext.FindAsync<T2>(item.Id2)
                    ?? throw new NullReferenceException());
            }
            return result;
        }

        /// <summary>
        /// Obtiene una lista de entidades de tipo 1 por tipo 2.
        /// </summary>
        /// <param name="id">El ID de tipo 2.</param>
        /// <returns>Una lista de entidades de tipo 1.</returns>
        public async Task<ICollection<T1>> GetType1ByType2(Guid id)
        {
            var type1_id = await _webDbContext.Set<T>()
                .Where(ur => ur.Id2 == id)
                .ToListAsync();
            var result = new List<T1>();
            foreach (var item in type1_id)
            {
                result.Add(await _webDbContext.FindAsync<T1>(item.Id1)
                    ?? throw new NullReferenceException());
            }
            return result;
        }

        // SUPER PENDIENTE
        /*public async Task<ICollection<T2>> GetType2ByType1Substring(string substring)
        {
            var entities = await GetBySubstring(substring);
            
            var result = new List<Type>();
            foreach(var entity in entities)
            {
                var relation = await _webDbContext.Set<Product_POS>()
                    .Where(x => x.Id1 == entity.Id1)
                    .ToListAsync();
                
                foreach (var ppos in relation)
                {
                    if (result.Any(x => x.Id2 == ppos.Point_ID))
                        continue;
                    
                    result.Add(await _webDbContext.FindAsync<Type>(ppos.Point_ID)
                        ?? throw new NullReferenceException());
                }
            }
            return result;
        }*/

        /// <summary>
        /// Agrega entidades de tipo 2 por tipo 1.
        /// </summary>
        /// <param name="id">El ID de tipo 1.</param>
        /// <param name="entities">Las entidades de tipo 2.</param>
        public async Task AddType2ByType1(Guid id, ICollection<T2> entities)
        {
            foreach (var type2 in entities)
            {
                try { await _relationService.AddAsync(id, type2.Id); }
                catch { continue; }
            }
        }

        /// <summary>
        /// Agrega entidades de tipo 1 por tipo 2.
        /// </summary>
        /// <param name="id">El ID de tipo 2.</param>
        /// <param name="entities">Las entidades de tipo 1.</param>
        public async Task AddType1ByType2(Guid id, ICollection<T1> entities)
        {
            foreach (var type1 in entities)
            {
                try { await _relationService.AddAsync(type1.Id, id); }
                catch { continue; }
            }
        }
    }
}
