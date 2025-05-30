﻿using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.Response;
using DavxeShop.Persistance.Interfaces;
using System.IdentityModel.Tokens.Jwt;
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

        public bool ValidateToken(LogInResponse userAndToken)
        {
            var token = _davxeShopDboHelper.GetTokenById(userAndToken.UserId ?? 0);

            if (!(userAndToken.Token == _davxeShopDboHelper.GetTokenById(userAndToken.UserId ?? 0))) return false;

            return true;
        }

        public bool ValidToken(string token)
        {
            return _davxeShopDboHelper.ValidToken(token);
        }

        public bool UserExistsById(int userId)
        {
            return _davxeShopDboHelper.UserExistsById(userId);
        }

        public int? GetUserIdFromToken(string token)
        {
            if (string.IsNullOrEmpty(token))
                return null;

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                var claim = jwt.Claims.FirstOrDefault(c => c.Type == "userId");
                if (claim != null && int.TryParse(claim.Value, out int userId))
                    return userId;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parseando token: {ex.Message}");
            }

            return null;
        }
    }
}
