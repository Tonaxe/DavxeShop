using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DavxeShop.Models.models
{
    public class AgregarProductoDTO
    {
        public int Categoria { get; set; }
        public string Descripcion { get; set; }
        public int Estado { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string ImagenUrl { get; set; }
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public int UserId { get; set; }
    }
}
