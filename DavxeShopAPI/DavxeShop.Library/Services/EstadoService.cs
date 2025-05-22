using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using DavxeShop.Persistance.Interfaces;

namespace DavxeShop.Library.Services
{
    public class EstadoService : IEstadoService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public EstadoService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public List<EstadoDTO> GetAllEstados()
        {
            return _davxeShopDboHelper.GetAllEstados();
        }
    }
}
