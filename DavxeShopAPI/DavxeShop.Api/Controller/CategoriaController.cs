using DavxeShop.Library.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api/DavxeShop")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly IValidations _validations;
        private readonly ICategoriaService _categoriaService;

        public CategoriaController(IValidations validations, ICategoriaService categoriaService)
        {
            _validations = validations;
            _categoriaService = categoriaService;
        }

        [HttpGet("categorias")]
        public IActionResult GetAllCategorias()
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

            var categorias = _categoriaService.GetAllCategorias();

            if (categorias == null || !categorias.Any())
            {
                return NotFound(new { message = "No hay categorias." });
            }

            return Ok(new { categorias = categorias });
        }

        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}
