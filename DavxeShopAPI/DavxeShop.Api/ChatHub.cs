using DavxeShop.Models.models;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task EnviarMensaje(string conversacionId, string remitenteId, string contenido)
    {
        await Clients.Group(conversacionId).SendAsync("RecibirMensaje", new
        {
            ConversacionId = conversacionId,
            RemitenteId = remitenteId,
            Contenido = contenido,
            FechaEnvio = DateTime.UtcNow
        });
    }

    public async Task UnirseConversacion(string conversacionId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conversacionId);
    }

    public async Task SalirConversacion(string conversacionId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversacionId);
    }

    public async Task NotificarEliminacionMensaje(string conversacionId, string mensajeId)
    {
        await Clients.Group(conversacionId).SendAsync("EliminarMensaje", mensajeId);
    }

    public async Task NotificarEdicionMensaje(string conversacionId, int mensajeId, string nuevoContenido)
    {
        await Clients.Group(conversacionId).SendAsync("MensajeEditado", new
        {
            MensajeId = mensajeId,
            Contenido = nuevoContenido,
            FechaModificacion = DateTime.UtcNow
        });
    }

    public async Task EnviarContraOferta(string conversacionId, ContraOfertaResponseDto contraOferta)
    {
        await Clients.Group(conversacionId).SendAsync("RecibirContraOferta", contraOferta);
    }
}