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
        public IActionResult AddProduct([FromBody] AgregarProductoDTO request)
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

        [HttpPatch("producto")]
        public IActionResult EditProduct([FromBody] ProductoDTO request)
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

            bool productEdited = _productoService.EditProduct(request);

            if (!productEdited)
            {
                return StatusCode(500, new { message = "El producto no se ha editado." });
            }

            return Ok(new { message = "El producto se ha editado correctamente" });
        }

        [HttpDelete("producto/{productId}")]
        public IActionResult DeleteProduct(int productId)
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

            bool productDeleted = _productoService.DeleteProduct(productId);

            if (!productDeleted)
            {
                return StatusCode(500, new { message = "El producto no se ha eliminado." });
            }

            return Ok(new { message = "El producto se ha eliminado correctamente" });
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

        [HttpGet("productos/{productoId}")]
        public IActionResult GetProductosByProductoId(int productoId)
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
            var loggedUserId = _validations.GetUserIdFromToken(token);

            var producto = _productoService.GetProductosByProductoId(productoId, loggedUserId.Value);

            if (producto == null)
            {
                return NotFound(new { message = "El producto no existe." });
            }

            return Ok(new { producto = producto });
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchedProducts([FromQuery] string query)
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

            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query requerida");

            var productos = _productoService.GetSearchedProducts(query);

            if (productos == null)
            {
                return NotFound(new { message = "El producto no existe." });
            }

            return Ok(new { productos = productos });
        }

        [HttpPost("favoritos")]
        public IActionResult AddFavorito([FromBody] FavoritoDTO favoritoDto)
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

            if (favoritoDto == null || HasNullOrEmptyProperties(favoritoDto))
            {
                return BadRequest(new { message = "El contenido de la petición está incompleto." });
            }

            var productos = _productoService.AddFavorito(favoritoDto);

            if (productos == null)
            {
                return NotFound(new { message = "El producto no existe." });
            }

            return Ok(new { message = "Producto agregado a favoritos." });
        }

        [HttpDelete("favoritos")]
        public async Task<IActionResult> DeleteFavorito([FromQuery] int userId, [FromQuery] int productoId)
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

            var resultado = _productoService.DeleteFavorito(userId, productoId);

            if (!resultado)
            {
                return NotFound(new { message = "Favorito no encontrado o no pudo ser eliminado" });
            }

            return Ok(new { message = "Producto se ha eliminado de favoritos." });
        }

        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}
