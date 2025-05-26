namespace DavxeShop.Models.models
{
    public class MensajeDto
    {
        public int MensajeId { get; set; }
        public string Contenido { get; set; }
        public DateTime FechaEnvio { get; set; }
        public int RemitenteId { get; set; }
    }
}
