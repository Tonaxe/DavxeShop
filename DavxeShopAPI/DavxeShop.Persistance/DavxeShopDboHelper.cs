using Azure.Core;
using DavxeShop.Models;
using DavxeShop.Models.Request;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Reflection.Metadata.Ecma335;

namespace DavxeShop.Persistance
{
    public class DavxeShopDboHelper : IDavxeShopDboHelper
    {
        private readonly DavxeShopContext _context;

        public DavxeShopDboHelper(DavxeShopContext context)
        {
            _context = context;
        }
        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User? GetUser(int UserId)
        {
            return _context.Users.FirstOrDefault(x => x.UserId.Equals(UserId));
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email));
        }

        public bool UserExists(string Name, string Email, string DNI)
        {
            return _context.Users.Any(x => x.Name == Name && x.Email == Email && x.DNI == DNI);
        }

        public bool SaveUser(User requestHashed)
        {
            try
            {
                _context.Users.Add(requestHashed);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CorrectUser(LogInRequest request)
        {
            return _context.Users.Any(x => x.Email == request.Email && x.Password == request.Password);
        }

        public string GetUserPasswordByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email))?.Password ?? "Usuario no encontrado";
        }

        public int? GetUserId(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email))?.UserId;
        }

        public bool StoreSession(Session session)
        {
            try
            {
                _context.Sessions.Add(session);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool LogOut(string token) 
        {
            var user = _context.Sessions.FirstOrDefault(x => x.Token == token);
            if (user == null) 
                return false;

            user.Ended = DateTime.Now;
            _context.SaveChanges();

            return true;
        }

        public string GetTokenById(int userId)
        {
            return _context.Sessions.First(x => x.UserId == userId).Token ?? string.Empty;
        }

        public bool SaveRecoveryCode(int userId, string code, string email)
        {
            try
            {
                _context.RecoverCodes.Add(new RecoverCodes
                {
                    UserId = userId,
                    RecoveryCode = code,
                    Email = email,
                    CreatedCode = DateTime.Now
                });
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request)
        {
            return _context.RecoverCodes.Any(x => x.Email == request.Email && x.RecoveryCode == request.RecoveryCode);
        }

        public bool ResetPassword(ResetPasswordRequest request)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x => x.Email == request.Email);
                
                if (user == null) return false;

                user.Password = request.Password;

                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
