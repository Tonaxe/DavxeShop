using DavxeShop.Models;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DavxeShop.Persistance
{
    public class TrenDboHelper : ITrenDboHelper
    {
        private readonly TrenScannerContext _context;

        public TrenDboHelper(TrenScannerContext context)
        {
            _context = context;
        }
        public List<TrenDbData> GetAllTrenes()
        {
            return _context.Trenes.ToList();
        }
    }
}
