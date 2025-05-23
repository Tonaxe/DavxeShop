using DavxeShop.Models.models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IProductoService
    {
        bool AddProduct(ProductoDTO producto);
        List<ProductoDTO> GetProductosByUserId(int userId);
        List<ProductoDTO> GetRandomProductos();
        List<UserProductsDTO> GetRandomProductosUsers();
        ProductoDTO? GetProductosByProductoId(int productoId);
        List<ProductoDTO> GetSearchedProducts(string query);
    }
}
