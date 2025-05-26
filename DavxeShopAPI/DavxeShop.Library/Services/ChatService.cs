namespace DavxeShop.Library.Services
{
    using DavxeShop.Models.dbModels;
    using DavxeShop.Models.models;
    using DavxeShop.Persistance.Interfaces;
    using System.Collections.Generic;

    public class ChatService : IChatService
    {
        private readonly IDavxeShopDboHelper _davxeShopDboHelper;

        public ChatService(IDavxeShopDboHelper davxeShopDboHelper)
        {
            _davxeShopDboHelper = davxeShopDboHelper;
        }

        public Conversacion CrearConversacion(int compradorId, int vendedorId)
        {
            return _davxeShopDboHelper.CrearConversacion(compradorId, vendedorId);
        }

        public List<ConversacionDto> ObtenerConversacionesDeUsuario(int userId)
        {
            return _davxeShopDboHelper.ObtenerConversacionesDeUsuario(userId);
        }

        public Conversacion? ObtenerConversacionConMensajes(int conversacionId, int userId)
        {
            return _davxeShopDboHelper.ObtenerConversacionConMensajes(conversacionId, userId);
        }

        public Mensaje EnviarMensaje(int remitenteId, int conversacionId, string contenido)
        {
            return _davxeShopDboHelper.EnviarMensaje(remitenteId, conversacionId, contenido);
        }

        public bool EliminarConversacion(int conversacionId, int userId)
        {
            return _davxeShopDboHelper.EliminarConversacion(conversacionId, userId);
        }
    }
}
