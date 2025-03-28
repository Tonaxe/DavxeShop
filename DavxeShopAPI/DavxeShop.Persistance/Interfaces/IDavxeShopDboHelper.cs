using DavxeShop.Models;

namespace DavxeShop.Persistance.Interfaces
{
    public interface IDavxeShopDboHelper
    {
        List<User> GetUsers();

        User GetUser(string dni);
    }
}
