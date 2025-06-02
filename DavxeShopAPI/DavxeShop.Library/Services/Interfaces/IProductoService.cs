using DavxeShop.Models.models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface IProductoService
    {
        bool AddProduct(AgregarProductoDTO producto);
        List<ProductoDTO> GetProductosByUserId(int userId);
        List<ProductoDTO> GetRandomProductos();
        List<UserProductsDTO> GetRandomProductosUsers();
        ProductoDTO? GetProductosByProductoId(int productoId, int loggedUserId);
        List<ProductoDTO> GetSearchedProducts(string query);
        bool EditProduct(ProductoDTO producto);
        bool DeleteProduct(int productId);
        bool AddFavorito(FavoritoDTO favoritoDto);
        bool DeleteFavorito(int userId, int productoId);
    }
}
