using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[Route("api/DavxeShop")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly IValidations _validations;
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatController(IChatService chatService, IValidations validations, IHubContext<ChatHub> hubContext)
    {
        _chatService = chatService;
        _validations = validations;
        _hubContext = hubContext;
    }

    [HttpPost("chat/conversacion")]
    public IActionResult CrearConversacion([FromBody] CrearConversacionDto dto)
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "No se ha enviado el token." });
        }

        var tokenIsValid = _validations.ValidToken(token);

        if (!tokenIsValid)
        {
            return Unauthorized(new { message = "El token es incorrecto." });
        }

        var userId = _validations.GetUserIdFromToken(token);
        if (userId == null) return Unauthorized(new { message = "Token inválido." });

        var conversacion = _chatService.CrearConversacion((int)userId, dto.SellerId);
        return Ok(conversacion);
    }

    [HttpGet("chat/conversaciones")]
    public IActionResult ObtenerMisConversaciones()
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "No se ha enviado el token." });
        }

        var tokenIsValid = _validations.ValidToken(token);

        if (!tokenIsValid)
        {
            return Unauthorized(new { message = "El token es incorrecto." });
        }

        var userId = _validations.GetUserIdFromToken(token);
        if (userId == null) return Unauthorized(new { message = "Token inválido." });

        var conversaciones = _chatService.ObtenerConversacionesDeUsuario((int)userId);

        return Ok(conversaciones);
    }

    [HttpGet("chat/conversacion/{id}")]
    public IActionResult ObtenerConversacion(int id)
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "No se ha enviado el token." });
        }

        var tokenIsValid = _validations.ValidToken(token);

        if (!tokenIsValid)
        {
            return Unauthorized(new { message = "El token es incorrecto." });
        }

        var userId = _validations.GetUserIdFromToken(token);
        if (userId == null) return Unauthorized(new { message = "Token inválido." });

        var conversacion = _chatService.ObtenerConversacionConMensajes(id, (int)userId);
        if (conversacion == null) return NotFound(new { message = "Conversación no encontrada o sin acceso." });

        return Ok(conversacion);
    }

    [HttpPost("chat/mensaje")]
    public async Task<IActionResult> EnviarMensaje([FromBody] CrearMensajeDto dto)
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "No se ha enviado el token." });
        }

        var tokenIsValid = _validations.ValidToken(token);

        if (!tokenIsValid)
        {
            return Unauthorized(new { message = "El token es incorrecto." });
        }

        var userId = _validations.GetUserIdFromToken(token);
        if (userId == null) return Unauthorized(new { message = "Token inválido." });

        var mensaje = _chatService.EnviarMensaje((int)userId, dto.ConversationId, dto.Content);

        await _hubContext.Clients.Group(dto.ConversationId.ToString())
            .SendAsync("RecibirMensaje", mensaje);

        return Ok(mensaje);
    }

    [HttpDelete("chat/conversacion/{id}")]
    public IActionResult EliminarConversacion(int id)
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "No se ha enviado el token." });
        }

        var tokenIsValid = _validations.ValidToken(token);

        if (!tokenIsValid)
        {
            return Unauthorized(new { message = "El token es incorrecto." });
        }

        var userId = _validations.GetUserIdFromToken(token);
        if (userId == null) return Unauthorized(new { message = "Token inválido." });

        var eliminado = _chatService.EliminarConversacion(id, (int)userId);
        if (!eliminado)
            return Forbid();

        return Ok(new { message = "Conversación eliminada correctamente." });
    }
}