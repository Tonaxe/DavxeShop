using DavxeShop.Models;
using DavxeShop.Models.dbModels;
using DavxeShop.Models.Request;

namespace DavxeShop.Persistance.Interfaces
{
    public interface IDavxeShopDboHelper
    {
        List<User> GetUsers();
        User? GetUser(int UserId);
        User? GetUserByEmail(string email);
        bool UserExists(string Name, string Email, string DNI);
        bool SaveUser(User requestHashed);
        bool CorrectUser(LogInRequest request);
        string GetUserPasswordByEmail(string email);
        int? GetUserId(string email);
        bool StoreSession(Session session);
        bool LogOut(string token);
        string GetTokenById(int userId);
        bool SaveRecoveryCode(int Userid, string code, string email);
        bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request);
        bool ResetPassword(ResetPasswordRequest request);
    }
}
