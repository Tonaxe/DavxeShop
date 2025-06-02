using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using DavxeShop.Persistance.Interfaces;

namespace DavxeShop.Library.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public ProductoService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public bool AddProduct(AgregarProductoDTO producto)
        {
            return _davxeShopDboHelper.AddProduct(producto);
        }

        public bool EditProduct(ProductoDTO producto)
        {
            return _davxeShopDboHelper.EditProduct(producto);
        }
        public bool DeleteProduct(int productId)
        {
            return _davxeShopDboHelper.DeleteProduct(productId);
        }

        public List<ProductoDTO> GetProductosByUserId(int userId)
        {
            return _davxeShopDboHelper.GetProductosByUserId(userId);
        }

        public List<ProductoDTO> GetRandomProductos()
        {
            return _davxeShopDboHelper.GetRandomProductos();
        }

        public List<UserProductsDTO> GetRandomProductosUsers()
        {
            return _davxeShopDboHelper.GetRandomProductosUsers();
        }

        public ProductoDTO? GetProductosByProductoId(int productoId, int loggedUserId)
        {
            return _davxeShopDboHelper.GetProductosByProductoId(productoId, loggedUserId);
        }

        public List<ProductoDTO> GetFavoritUsersProducts(int userId)
        {
            return _davxeShopDboHelper.GetFavoritUsersProducts(userId);
        }

        public List<ProductoDTO> GetSearchedProducts(string query)
        {
            return _davxeShopDboHelper.GetSearchedProducts(query);
        }

        public bool AddFavorito(FavoritoDTO favoritoDto)
        {
            return _davxeShopDboHelper.AddFavorito(favoritoDto);
        }

        public bool DeleteFavorito(int userId, int productoId)
        {
            return _davxeShopDboHelper.DeleteFavorito(userId, productoId);
        }
    }
}
