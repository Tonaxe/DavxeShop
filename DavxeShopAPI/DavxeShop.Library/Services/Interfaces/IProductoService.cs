using DavxeShop.Models.models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IProductoService
    {
        bool AddProduct(AgregarProductoDTO producto);
        List<ProductoDTO> GetProductosByUserId(int userId);
        List<ProductoDTO> GetRandomProductos();
        List<UserProductsDTO> GetRandomProductosUsers();
        ProductoDTO? GetProductosByProductoId(int productoId);
        List<ProductoDTO> GetSearchedProducts(string query);
        bool EditProduct(ProductoDTO producto);
    }
}
