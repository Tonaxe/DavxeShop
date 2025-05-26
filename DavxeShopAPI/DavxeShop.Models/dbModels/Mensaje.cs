using System.Text.Json.Serialization;

namespace DavxeShop.Models.dbModels
{
    public class Mensaje
    {
        public int MensajeId { get; set; }

        public int ConversacionId { get; set; }
        public int RemitenteId { get; set; }

        public string Contenido { get; set; } = null!;
        public DateTime FechaEnvio { get; set; }
        public bool Leido { get; set; }

        [JsonIgnore]
        public virtual Conversacion Conversacion { get; set; } = null!;
        public virtual User Remitente { get; set; } = null!;
    }
}
