using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class POSService : IEntityService<Point_of_Sales>
    {
        private readonly WebDbContext _webDbContext;

        public POSService(WebDbContext webDbContext)
        {
            _webDbContext = webDbContext;
        }

        /// <summary>
        /// Obtiene un punto de venta por su ID.
        /// </summary>
        /// <param name="point_id">ID del punto de venta.</param>
        /// <returns>El punto de venta encontrado.</returns>
        public async Task<Point_of_Sales> GetAsync(Guid point_id)
        {
            var current_pos = await _webDbContext.FindAsync<Point_of_Sales>(point_id)
                ?? throw new InvalidOperationException("Punto de venta no encontrado");
            return current_pos;
        }

        /// <summary>
        /// Obtiene un punto de venta por su nombre.
        /// </summary>
        /// <param name="point_name">Nombre del punto de venta.</param>
        /// <returns>El punto de venta encontrado.</returns>
        public async Task<Point_of_Sales> GetAsync(string point_name)
        {
            var current_point = await _webDbContext.Points_Of_Sales!.FirstOrDefaultAsync(
                x => x.Name!.Equals(point_name)
            ) ?? throw new InvalidOperationException("Punto de venta no encontrado");
            return current_point;
        }

        /// <summary>
        /// Obtiene una lista de puntos de venta limitada por tamaño.
        /// </summary>
        /// <param name="size">Tamaño de la lista de puntos de venta.</param>
        /// <returns>La lista de puntos de venta.</returns>
        public IEnumerable<Point_of_Sales> Take(int size) =>
            _webDbContext.Points_Of_Sales!.OrderBy(x => x.Name).Take(size);

        /// <summary>
        /// Agrega un nuevo punto de venta.
        /// </summary>
        /// <param name="new_pos">Nuevo punto de venta a agregar.</param>
        public async Task AddAsync(Point_of_Sales new_pos)
        {
            if (await _webDbContext.Points_Of_Sales!.AnyAsync(pos => pos.Name!.Equals(new_pos.Name)))
                throw new InvalidOperationException("El punto de venta ya existe");

            await _webDbContext.AddAsync(new_pos);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina un punto de venta por su ID.
        /// </summary>
        /// <param name="point_id">ID del punto de venta a eliminar.</param>
        public async Task RemoveAsync(Guid point_id)
        {
            var current_pos = await GetAsync(point_id);
            _webDbContext.Remove(current_pos);
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Edita un punto de venta por su ID.
        /// </summary>
        /// <param name="point_id">ID del punto de venta a editar.</param>
        /// <param name="edited_pos">Punto de venta editado.</param>
        public async Task EditAsync(Guid point_id, Point_of_Sales edited_pos)
        {
            var current_pos = await GetAsync(point_id);
            current_pos.Name = edited_pos.Name;
            current_pos.Address = edited_pos.Address;
            current_pos.Image = edited_pos.Image;
            current_pos.Latitude = edited_pos.Latitude;
            current_pos.Longitude = edited_pos.Longitude;
            current_pos.Municipality = edited_pos.Municipality;
            current_pos.Province = current_pos.Province;
            _webDbContext.Entry(current_pos).State = EntityState.Modified;
            await _webDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene todos los puntos de venta.
        /// </summary>
        /// <returns>La lista de todos los puntos de venta.</returns>
        public async Task<List<Point_of_Sales>> GetAllAsync()
        {
            var poss = await _webDbContext.Points_Of_Sales!.ToListAsync();
            return poss;
        }

        /// <summary>
        /// Elimina todos los puntos de venta.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            _webDbContext.RemoveRange(_webDbContext.Points_Of_Sales!);
            await _webDbContext.SaveChangesAsync();
        }
    }
}