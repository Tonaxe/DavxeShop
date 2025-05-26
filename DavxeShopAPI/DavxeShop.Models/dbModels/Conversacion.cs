namespace DavxeShop.Models.dbModels
{
    public class Conversacion
    {
        public int ConversacionId { get; set; }

        public int CompradorId { get; set; }
        public int VendedorId { get; set; }

        public int? CompraId { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual User Comprador { get; set; } = null!;
        public virtual User Vendedor { get; set; } = null!;
        public virtual Compra? Compra { get; set; }

        public virtual ICollection<Mensaje> Mensajes { get; set; } = new List<Mensaje>();
    }
}
