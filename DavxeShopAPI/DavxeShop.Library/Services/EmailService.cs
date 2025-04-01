using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Persistance.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;

namespace DavxeShop.Library.Services
{
    public class EmailService : IEmailService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        private readonly string _emailFrom = "yassin.menbel@gmail.com";
        private readonly string _password = "ywcx llyl nupr uusa";

        public EmailService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public bool SendEmail(string to, string subject, string body)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("Soporte", _emailFrom));
                email.To.Add(new MailboxAddress("", to));
                email.Subject = subject;

                var bodyBuilder = new BodyBuilder { HtmlBody = body };
                email.Body = bodyBuilder.ToMessageBody();

                using (var smtp = new SmtpClient())
                {
                    smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                    smtp.Authenticate(_emailFrom, _password);
                    smtp.Send(email);
                    smtp.Disconnect(true);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
