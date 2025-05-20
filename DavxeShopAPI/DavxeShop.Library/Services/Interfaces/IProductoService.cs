using DavxeShop.Models.Request.Producto;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IProductoService
    {
        bool AddProduct(ProductoDto producto);
    }
}
