using Labiofam.Models;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services;

public class RelationFilterService : IRelationFilter
{
    private readonly WebDbContext _webDbContext;

    public RelationFilterService(WebDbContext webDbContext)
    {
        _webDbContext = webDbContext;
    }

    /// <summary>
    /// Obtiene los roles asociados a un usuario.
    /// </summary>
    /// <param name="user_id">ID del usuario.</param>
    /// <returns>Lista de roles asociados al usuario.</returns>
    public async Task<List<Role>> GetRolesByUser(Guid user_id)
    {
        var roles_id = await _webDbContext.User_Role!
            .Where(ur => ur.UserId == user_id)
            .ToListAsync();
        var result = new List<Role>();
        foreach (var role in roles_id)
        {
            result.Add(await _webDbContext.FindAsync<Role>(role.RoleId)
                ?? throw new NullReferenceException());
        }
        return result;
    }

    /// <summary>
    /// Obtiene los usuarios asociados a un rol.
    /// </summary>
    /// <param name="role_id">ID del rol.</param>
    /// <returns>Lista de usuarios asociados al rol.</returns>
    public async Task<List<User>> GetUsersByRole(Guid role_id)
    {
        var users_id = await _webDbContext.User_Role!
            .Where(ur => ur.RoleId == role_id)
            .ToListAsync();
        var result = new List<User>();
        foreach (var user in users_id)
        {
            result.Add(await _webDbContext.FindAsync<User>(user.UserId)
                ?? throw new NullReferenceException());
        }
        return result;
    }

    /// <summary>
    /// Obtiene los productos asociados a un usuario.
    /// </summary>
    /// <param name="role_id">ID del usuario.</param>
    /// <returns>Lista de productos asociados al usuario.</returns>
    public async Task<List<Product>> GetProductsByUser(Guid user_id)
    {
        var products_id = await _webDbContext.User_Product!
            .Where(up => up.User_ID == user_id)
            .ToListAsync();

        var result = new List<Product>();
        foreach (var product in products_id)
            result.Add(await _webDbContext.FindAsync<Product>(product.Product_ID)
                ?? throw new NullReferenceException());

        return result;
    }

    /// <summary>
    /// Obtiene los usuarios asociados a un producto.
    /// </summary>
    /// <param name="role_id">ID del producto.</param>
    /// <returns>Lista de usuarios asociados al producto.</returns>
    public async Task<List<User>> GetUsersByProduct(Guid product_id)
    {
        var users_id = await _webDbContext.User_Product!
            .Where(up => up.Product_ID == product_id)
            .ToListAsync();

        var result = new List<User>();
        foreach (var user in users_id)
            result.Add(await _webDbContext.FindAsync<User>(user.User_ID)
                ?? throw new NullReferenceException());

        return result;
    }

    /// <summary>
    /// Obtiene los puntos de venta asociados a un producto.
    /// </summary>
    /// <param name="role_id">ID del producto.</param>
    /// <returns>Lista de puntos de venta asociados al producto.</returns>
    public async Task<List<Point_of_Sales>> GetPOSByProduct(Guid product_id)
    {
        var poss_id = await _webDbContext.Product_POS!
            .Where(ppos => ppos.Product_ID == product_id)
            .ToListAsync();

        var result = new List<Point_of_Sales>();
        foreach (var pos in poss_id)
            result.Add(await _webDbContext.FindAsync<Point_of_Sales>(pos.Point_ID)
                ?? throw new NullReferenceException());

        return result;
    }

    /// <summary>
    /// Obtiene los productos asociados a un punto de venta.
    /// </summary>
    /// <param name="role_id">ID del punto de venta.</param>
    /// <returns>Lista de productos asociados al punto de venta.</returns>
    public async Task<List<Product>> GetProductsByPOS(Guid pos_id)
    {
        var products_id = await _webDbContext.Product_POS!
            .Where(ppos => ppos.Point_ID == pos_id)
            .ToListAsync();

        var result = new List<Product>();
        foreach (var product in products_id)
            result.Add(await _webDbContext.FindAsync<Product>(product.Product_ID)
                ?? throw new NullReferenceException());

        return result;
    }
}