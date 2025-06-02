using DavxeShop.Models.models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IDashboardService
    {
        DashboardUsuariosDto GetUsersData();
        ProductDashboardDto GetProductsData();
        ResumenVentasDto GetVentasData();
        ResumenChatResponse GetChatData();
    }
}
