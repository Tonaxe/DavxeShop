using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;

public interface IChatService
{
    Conversacion CrearConversacion(int compradorId, int vendedorId);
    List<ConversacionDto> ObtenerConversacionesDeUsuario(int userId);
    Conversacion? ObtenerConversacionConMensajes(int conversacionId, int userId);
    Mensaje EnviarMensaje(int remitenteId, int conversacionId, string contenido);
    bool EliminarConversacion(int conversacionId, int userId);
}