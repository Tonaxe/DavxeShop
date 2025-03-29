using DavxeShop.Models;

namespace DavxeShop.Persistance.Interfaces
{
    public interface IDavxeShopDboHelper
    {
        List<User> GetUsers();
        User? GetUser(int UserId);
        bool UserExists(string Name, string Email, string DNI);
        bool SaveUser(User requestHashed);
        bool CorrectUser(LogInRequest request);
        string GetUserPasswordByEmail(string email);
    }
}
