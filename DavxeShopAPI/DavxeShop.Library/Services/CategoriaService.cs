using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using DavxeShop.Persistance.Interfaces;

namespace DavxeShop.Library.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public CategoriaService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public List<CategoriaDTO> GetAllCategorias()
        {
            return _davxeShopDboHelper.GetAllCategorias();
        }
    }
}
