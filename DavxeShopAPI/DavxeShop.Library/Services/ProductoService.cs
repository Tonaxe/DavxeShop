﻿using DavxeShop.Library.Services.Interfaces;
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

        public bool AddProduct(ProductoDTO producto)
        {
            return _davxeShopDboHelper.AddProduct(producto);
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

        public ProductoDTO? GetProductosByProductoId(int productoId)
        {
            return _davxeShopDboHelper.GetProductosByProductoId(productoId);
        }

        public List<ProductoDTO> GetSearchedProducts(string query)
        {
            return _davxeShopDboHelper.GetSearchedProducts(query);
        }
    }
}
