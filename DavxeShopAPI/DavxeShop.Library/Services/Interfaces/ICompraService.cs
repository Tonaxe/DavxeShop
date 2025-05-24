using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DavxeShop.Library.Services.Interfaces
{
    public interface ICompraService
    {
        Compra CrearCompra(CrearCompraDto crearCompra);
    }
}
