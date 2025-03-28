using DavxeShop.Models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetUser(int UserId);
    }
}
