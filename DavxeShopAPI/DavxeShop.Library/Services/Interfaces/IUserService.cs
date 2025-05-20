using DavxeShop.Models.dbModels;
using DavxeShop.Models.Request.User;
using DavxeShop.Models.Response;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        UserBasicDto GetUser(int UserId);
        User RequestHashed(RegisterRequest request);
        bool SaveUser(User request);
        string GenerateToken(string email);
        bool CorrectUser(LogInRequest request);
        bool StoreSession(string token, int userId);
        bool LogOut(string request);
        int? GetUserIdByEmail(string email);
        bool SendRecoveryCode(string email);
        bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request);
        bool ResetPassword(ResetPasswordRequest request);
    }
}
