using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using DavxeShop.Persistance.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DavxeShop.Library.Services
{
    public class CompraService : ICompraService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public CompraService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }
        public Compra CrearCompra(CrearCompraDto crearCompra)
        {
            return _davxeShopDboHelper.CrearCompra(crearCompra);
        }
    }
}
