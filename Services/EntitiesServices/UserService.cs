using Labiofam.Models;
using Microsoft.AspNetCore.Identity;

namespace Labiofam.Services
{
    public class UserService : EntityModelService<User, RegistrationModel>,
        IEntityService<User>, IEntityModelService<User, RegistrationModel>
    {
        private readonly UserManager<User> _userManager;

        public UserService(WebDbContext webDbContext, UserManager<User> userManager)
            : base(webDbContext)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Agrega un nuevo usuario.
        /// </summary>
        /// <param name="new_user">El nuevo usuario a agregar.</param>
        /// <returns>El usuario agregado.</returns>
        public override async Task<User> AddAsync(RegistrationModel new_user)
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
                throw new ArgumentException("Fatal error");

            return user;
        }

        /// <summary>
        /// Edita un usuario por su identificador único.
        /// </summary>
        /// <param name="user_id">Identificador único del usuario a editar.</param>
        /// <param name="edited_model">El modelo editado del usuario.</param>
        public override async Task EditAsync(Guid user_id, RegistrationModel edited_model)
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
    }
}