using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using DavxeShop.Models.Request.Producto;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IProductoService
    {
        bool AddProduct(ProductoDto producto);
        List<ProductoDTO> GetProductosByUserId(int userId);
        List<ProductoDTO> GetRandomProductos();
    }
}
