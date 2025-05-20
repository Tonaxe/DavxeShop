using DavxeShop.Models.dbModels;
using DavxeShop.Models.Request.Producto;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IProductoService
    {
        bool AddProduct(ProductoDto producto);
        List<Productos> GetProductosByUserId(int userId);

    }
}
