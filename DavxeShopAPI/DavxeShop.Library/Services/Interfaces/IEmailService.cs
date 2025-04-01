namespace DavxeShop.Library.Services.Interfaces
{
    public interface IEmailService
    {
        bool SendEmail(string to, string subject, string body);
    }
}
