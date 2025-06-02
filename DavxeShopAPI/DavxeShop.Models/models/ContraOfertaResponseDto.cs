namespace DavxeShop.Models.models
{
    public class ContraOfertaResponseDto
    {
        public int MensajeId { get; set; }
        public int ConversacionId { get; set; }
        public int RemitenteId { get; set; }
        public decimal PrecioContraOferta { get; set; }
        public string Comentario { get; set; }
        public DateTime FechaEnvio { get; set; }
        public bool Leido { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; }
        public string ProductoFotoUrl { get; set; }
    }
}
