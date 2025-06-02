namespace DavxeShop.Models.models
{
    public class ContraOfertaDto
    {
        public int ConversacionId { get; set; }
        public int RemitenteId { get; set; }
        public int ProductoId { get; set; }
        public decimal PrecioContraOferta { get; set; }
        public string Comentario { get; set; }
    }
}
