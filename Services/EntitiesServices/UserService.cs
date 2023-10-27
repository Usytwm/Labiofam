using Labiofam.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Labiofam.Services
{
    public class UserService : IRegistrationService<User, RegistrationModel>
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Obtiene un usuario por su identificador único.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario.</param>
        /// <returns>El usuario encontrado.</returns>
        public async Task<User> GetAsync(Guid user_id)
        {
            var current_user = await _userManager.FindByIdAsync(user_id.ToString())
                ?? throw new InvalidOperationException("User not found");
            return current_user;
        }

        /// <summary>
        /// Obtiene un usuario por su nombre.
        /// </summary>
        /// <param name="user_name">Nombre del usuario.</param>
        /// <returns>El usuario encontrado.</returns>
        public async Task<User> GetAsync(string user_name)
        {
            var current_user = await _userManager.FindByNameAsync(user_name)
                ?? throw new InvalidOperationException("User not found");
            return current_user;
        }

        /// <summary>
        /// Obtiene una lista de usuarios ordenados alfabéticamente y limitados por un tamaño específico.
        /// </summary>
        /// <param name="size">Tamaño máximo de la lista.</param>
        /// <returns>La lista de usuarios.</returns>
        public IEnumerable<User> Take(int size) =>
            _userManager.Users.OrderBy(x => x.UserName).Take(size);

        /// <summary>
        /// Agrega un nuevo usuario.
        /// </summary>
        /// <param name="new_user">El nuevo usuario a agregar.</param>
        /// <returns>El usuario agregado.</returns>
        public async Task<User> AddAsync(RegistrationModel new_user)
        {
            if (await _userManager.FindByNameAsync(new_user.Name!) is not null)
                throw new InvalidOperationException("The user already exists");

            var user = new User()
            {
                UserName = new_user.Name,
                Email = new_user.Email
            };

            var result = await _userManager.CreateAsync(
                user,
                new_user.Password ?? throw new ArgumentException("Password required")
            );

            if (!result.Succeeded)
                throw new ArgumentException("Password error");
            //aki hay vedces que da error de username, no devulevas solamente errores de paswword

            return user;
        }

        /// <summary>
        /// Elimina un usuario por su identificador único.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario a eliminar.</param>
        public async Task RemoveAsync(Guid user_id)
        {
            var current_user = await GetAsync(user_id);
            await _userManager.DeleteAsync(current_user);
        }

        /// <summary>
        /// Edita un usuario por su identificador único.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario a editar.</param>
        /// <param name="edited_model">El modelo editado del usuario.</param>
        public async Task EditAsync(Guid user_id, RegistrationModel edited_model)
        {
            var current_user = await GetAsync(user_id);
            current_user.UserName = edited_model.Name;

            if (edited_model.Old_Password is not null && edited_model.Password is not null)
                await _userManager.ChangePasswordAsync(
                    current_user, edited_model.Old_Password, edited_model.Password
                );

            if (edited_model.Email is not null && edited_model.Email_Token is not null)
                await _userManager.ChangeEmailAsync(
                    current_user, edited_model.Email, edited_model.Email_Token
                );

            await _userManager.UpdateAsync(current_user);
        }

        /// <summary>
        /// Obtiene una lista de todos los usuarios.
        /// </summary>
        /// <returns>La lista de usuarios.</returns>
        public async Task<List<User>> GetAllAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            return users;
        }

        /// <summary>
        /// Elimina todos los usuarios.
        /// </summary>
        public async Task RemoveAllAsync()
        {
            var users = await GetAllAsync();
            foreach (var user in users)
                await _userManager.DeleteAsync(user);
        }
    }
}