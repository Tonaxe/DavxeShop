using System.Text.Json.Serialization;

namespace DavxeShop.Models.models
{
    public class CrearMensajeDto
    {
        [JsonPropertyName("conversacionId")]
        public int ConversationId { get; set; }

        [JsonPropertyName("contenido")]
        public string Content { get; set; } = null!;
    }
}
