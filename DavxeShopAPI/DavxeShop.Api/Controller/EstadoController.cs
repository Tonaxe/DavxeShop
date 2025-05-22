using DavxeShop.Library.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api/DavxeShop")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly IValidations _validations;
        private readonly IEstadoService _estadoService;

        public EstadoController(IValidations validations, IEstadoService estadoService)
        {
            _validations = validations;
            _estadoService = estadoService;
        }

        [HttpGet("estados")]
        public IActionResult GetAllEstados()
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

            var estados = _estadoService.GetAllEstados();

            if (estados == null || !estados.Any())
            {
                return NotFound(new { message = "No hay categorias." });
            }

            return Ok(new { estados = estados });
        }

        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}
