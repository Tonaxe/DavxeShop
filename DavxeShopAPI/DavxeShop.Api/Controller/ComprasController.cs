using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using Microsoft.AspNetCore.Mvc;

[Route("api/DavxeShop")]
[ApiController]
public class ComprasController : ControllerBase
{
    private readonly ICompraService _compraService;
    private readonly IValidations _validations;

    public ComprasController(ICompraService compraService, IValidations validations)
    {
        _compraService = compraService;
        _validations = validations;
    }

    [HttpPost("compras")]
    public IActionResult CrearCompra([FromBody] CrearCompraDto crearCompra)
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

        if (crearCompra == null || HasNullOrEmptyProperties(crearCompra))
        {
            return BadRequest(new { message = "El contenido de la petición está incompleto." });
        }

        var compraId = _compraService.CrearCompra(crearCompra);
        return Ok(new { CompraId = compraId });
    }

    private bool HasNullOrEmptyProperties(object obj)
    {
        return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
    }
}