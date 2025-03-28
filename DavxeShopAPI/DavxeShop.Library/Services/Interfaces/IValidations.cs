namespace DavxeShop.Library.Services.Interfaces
{
    public interface IValidations
    {
        bool ValidEmail(string email);
        bool ValidDni(string dni);
        bool UserExists(string Name, string Email, string DNI);
    }
}
