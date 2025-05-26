namespace DavxeShop.Models.models
{
    public class ConversacionDto
    {
        public int ConversacionId { get; set; }
        public int CompradorId { get; set; }
        public int VendedorId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public MensajeDto? UltimoMensaje { get; set; }

        public UsuarioDto OtroUsuario { get; set; }
    }
}
