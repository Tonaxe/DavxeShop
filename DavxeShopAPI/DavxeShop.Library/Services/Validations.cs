using Azure.Core;
using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Persistance.Interfaces;
using System.Text.RegularExpressions;

namespace DavxeShop.Library.Services
{
    public class Validations : IValidations
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public Validations(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public bool ValidEmail(string email)
        {
            string pattern = @"^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, pattern);
        }

        public bool ValidDni(string dni)
        {
            if (dni.Length != 9) return false;

            string numbersPart = dni.Substring(0, 8);
            string letterPart = dni.Substring(8, 1);

            if (!int.TryParse(numbersPart, out int dniNumbers)) return false;

            string validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
            char correctLetter = validLetters[dniNumbers % 23];

            return letterPart.Equals(correctLetter.ToString(), StringComparison.OrdinalIgnoreCase);
        }

        public bool UserExists(string Name, string Email, string DNI) 
        {
            return _davxeShopDboHelper.UserExists(Name, Email, DNI);
        }
    }
}
