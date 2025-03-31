using DavxeShop.Models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IValidations
    {
        bool ValidEmail(string email);
        bool ValidDni(string dni);
        bool UserExists(string Name, string Email, string DNI);
        bool ValidateToken(LogInResponse userAndToken);
    }
}
