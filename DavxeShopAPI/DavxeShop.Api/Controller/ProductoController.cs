using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.models;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api/DavxeShop")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IValidations _validations;
        private readonly IProductoService _productoService;

        public ProductoController(IValidations validations, IProductoService productoService)
        {
            _validations = validations;
            _productoService = productoService;
        }

        [HttpPost("producto")]
        public IActionResult AddProduct([FromBody] ProductoDTO request)
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

            if (request == null || HasNullOrEmptyProperties(request))
            {
                return BadRequest(new { message = "El contenido de la petición está incompleto." });
            }

            bool userExists = _validations.UserExistsById(request.UserId);

            if (!userExists)
            {
                return NotFound(new { message = "El usuario no existe." });
            }

            bool productAdded = _productoService.AddProduct(request);

            if (!productAdded)
            {
                return StatusCode(500, new { message = "El producto no se ha añadido." });
            }

            return Ok(new { message = "El producto se ha añadido correctamente" });
        }

        [HttpGet("productos/users/{userId}")]
        public IActionResult GetProductosByUserId(int userId)
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

            if (!_validations.UserExistsById(userId))
            {
                return NotFound(new { message = "El usuario no existe." });
            }

            var productos = _productoService.GetProductosByUserId(userId);

            if (productos == null || !productos.Any())
            {
                return NotFound(new { message = "El usuario no tiene productos." });
            }

            return Ok(new { productos = productos });
        }

        [HttpGet("productos/random")]
        public IActionResult GetRandomProductos()
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

            var productos = _productoService.GetRandomProductos();

            if (productos == null || !productos.Any())
            {
                return NotFound(new { message = "El usuario no tiene productos." });
            }

            return Ok(new { productos = productos });
        }

        [HttpGet("productos/users-random")]
        public IActionResult GetRandomProductosUsers()
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

            var userProducts = _productoService.GetRandomProductosUsers();

            if (userProducts == null || !userProducts.Any())
            {
                return NotFound(new { message = "El usuario no tiene productos." });
            }

            return Ok(new { userProducts = userProducts });
        }

        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}
