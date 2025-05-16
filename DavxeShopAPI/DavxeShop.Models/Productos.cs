using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DavxeShop.Models;

namespace DavxeShop.Models
{
    public class Productos
    {
        public int ProductId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string Categoria { get; set; }
        public string ImagenUrl { get; set; }
        public virtual User UserId { get; set; }
    }
}
