using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models;
using DavxeShop.Persistance.Interfaces;

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
            return _davxeShopDboHelper.GetAllTrenes();
        }
    }
}
