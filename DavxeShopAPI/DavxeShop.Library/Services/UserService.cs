using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models;
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
        private readonly string _secretKey;

        public UserService(IDavxeShopDboHelper davxeShopDboHelper, IConfiguration configuration)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
            _secretKey = configuration["AppSettings:SecretKey"] ?? throw new ArgumentNullException(nameof(configuration), "No se ha encontrado la SecretKet en la configuracion.");
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

        public string GenerateToken(LogInRequest request)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, request.Email)
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
    }
}
