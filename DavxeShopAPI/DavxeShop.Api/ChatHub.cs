using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task EnviarMensaje(string conversacionId, string remitenteId, string contenido)
    {
        await Clients.Group(conversacionId)
            .SendAsync("RecibirMensaje", new
            {
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
}