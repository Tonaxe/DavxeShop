using Azure.Core;
using DavxeShop.Models;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

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
    }
}
