﻿using DavxeShop.Models.models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface ICategoriaService
    {
        List<CategoriaDTO> GetAllCategorias();
        List<ProductoDTO> GetProductosByCategoria(int categoriaId);
    }
}
