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
        public List<User> GetAllTrenes()
        {
            return _context.Users.ToList();
        }
    }
}
