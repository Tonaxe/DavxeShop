using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models;
using DavxeShop.Persistance.Interfaces;
using System.Text.RegularExpressions;

namespace DavxeShop.Library.Services
{
    public class UserService : IUserService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public UserService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public List<User> GetUsers()
        {
            return _davxeShopDboHelper.GetUsers();
        }

        public User GetUser(int UserId)
        {
            return _davxeShopDboHelper.GetUser(UserId);
        }

        public string Register(RegisterRequest request) 
        {
            //3 hashear la contraseña
            //4 hacer un salt para que 2 usuario puedan tener la misma contraseña sin conflicto
            //5 guardar en base de datos
            //6 generar el token
            return "";
        }
    }
}
