using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface ICompraService
    {
        Compra CrearCompra(CrearCompraDto crearCompra);
    }
}
