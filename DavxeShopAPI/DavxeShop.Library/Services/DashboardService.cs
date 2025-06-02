using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using DavxeShop.Persistance.Interfaces;

namespace DavxeShop.Library.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public DashboardService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }
        public DashboardUsuariosDto GetUsersData()
        {
            return _davxeShopDboHelper.GetUsersData();
        }

        public ProductDashboardDto GetProductsData()
        {
            return _davxeShopDboHelper.GetProductsData();
        }

        public ResumenVentasDto GetVentasData()
        {
            return _davxeShopDboHelper.GetVentasData();
        }

        public ResumenChatResponse GetChatData()
        {
            return _davxeShopDboHelper.GetChatData();
        }
    }
}
