using DavxeShop.Models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User? GetUser(int UserId);
        User RequestHashed(RegisterRequest request);
        bool SaveUser(User request);
        string GenerateToken(string email);
        bool CorrectUser(LogInRequest request);
        bool StoreSession(string token, int userId);
        bool LogOut(string request);
        int? GetUserIdByEmail(string email);
    }
}
