using DavxeShop.Models;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public User GetUser(int UserId)
        {
            return _context.Users.FirstOrDefault(x => x.UserId.Equals(UserId));
        }

        public bool UserExists(string Name, string Email, string DNI)
        {
            return _context.Users.Any(x => x.Name == Name && x.Email == Email && x.DNI == DNI);
        }
    }
}
