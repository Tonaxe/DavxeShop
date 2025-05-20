using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models;
using DavxeShop.Models.dbModels;
using DavxeShop.Models.Request;
using DavxeShop.Persistance.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DavxeShop.Library.Services
{
    public class UserService : IUserService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;
        private readonly IEmailService _emailService;
        private readonly string _secretKey;

        public UserService(IDavxeShopDboHelper davxeShopDboHelper, IConfiguration configuration, IEmailService emailService)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
            _secretKey = configuration["AppSettings:SecretKey"] ?? throw new ArgumentNullException(nameof(configuration), "No se ha encontrado la SecretKet en la configuracion.");
            _emailService = emailService;
        }

        public List<User> GetUsers()
        {
            return _davxeShopDboHelper.GetUsers();
        }

        public User? GetUser(int UserId)
        {
            return _davxeShopDboHelper.GetUser(UserId);
        }

        public User RequestHashed(RegisterRequest request)
        {
            var requestHashed = new User
            {
                DNI = request.DNI,
                Name = request.Name,
                Email = request.Email,
                BirthDate = request.BirthDate,
                City = request.City,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password, BCrypt.Net.BCrypt.GenerateSalt(5))
            };

            return requestHashed;
        }

        public bool SaveUser(User request)
        {
            return _davxeShopDboHelper.SaveUser(request);
        }

        public string GenerateToken(string email)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
            issuer: "DavxeShop",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(token);
        }

        public bool CorrectUser(LogInRequest request)
        {
            if (!BCrypt.Net.BCrypt.Verify(request.Password, _davxeShopDboHelper.GetUserPasswordByEmail(request.Email)))
            {
                return false;
            }
            return true;
        }

        public bool StoreSession(string token, int userId)
        {
            if (userId == 0)
            {
                return false;
            }

            var session = new Session
            {
                UserId = userId,
                Token = token,
                Started = DateTime.Now,
                Ended = null
            };

            return _davxeShopDboHelper.StoreSession(session);
        }

        public bool LogOut(string token)
        {
            return _davxeShopDboHelper.LogOut(token);
        }

        public int? GetUserIdByEmail(string email)
        {
            return _davxeShopDboHelper.GetUserId(email);
        }

        public bool SendRecoveryCode(string email)
        {
            var user = _davxeShopDboHelper.GetUserByEmail(email);

            if (user == null) return false;

            string code = GenerateRecoveryCode(6);

            string message = $"<h3>Recuperación de contraseña</h3><p>Tu código de recuperación es: <strong>{code}</strong></p>";

            _emailService.SendEmail(email, "Código de recuperación", message);

            return _davxeShopDboHelper.SaveRecoveryCode(user.UserId, code, email);
        }

        public bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request)
        {
            return _davxeShopDboHelper.VerifyRecoveryCode(request);
        }

        public bool ResetPassword(ResetPasswordRequest request)
        {
            var passwordHashed = new ResetPasswordRequest
            {
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password, BCrypt.Net.BCrypt.GenerateSalt(5))
            };

            return _davxeShopDboHelper.ResetPassword(passwordHashed);
        }

        private string GenerateRecoveryCode(int length)
        {
            return new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", length).Select(s => s[new Random().Next(s.Length)]).ToArray());
        }
    }
}
