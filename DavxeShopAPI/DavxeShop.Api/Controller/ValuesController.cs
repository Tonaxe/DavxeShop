using Azure.Core;
using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidations _validations;

        public ValuesController(IUserService userService, IValidations validations)
        {
            _userService = userService;
            _validations = validations;
        }

        [HttpGet("DavxeShop/users")]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();

            if (users == null || !users.Any())
            {
                return NotFound("El usuario no se ha encontrado.");
            }

            return Ok(users);
        }

        [HttpGet("DavxeShop/users/{UserId}")]
        public IActionResult GetUser(int UserId)
        {
            if (UserId <= 0)
            {
                return BadRequest("El contenido de la petición está incompleto.");
            }

            var users = _userService.GetUser(UserId);

            if (users == null)
            {
                return NotFound("El usuario no se ha encontrado.");
            }

            return Ok(users);
        }

        [HttpPost("DavxeShop/register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (request == null || HasNullOrEmptyProperties(request))
            {
                return BadRequest("El contenido de la petición está incompleto.");
            }

            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest("El email no es válido.");
            }

            bool validatedDNI = _validations.ValidDni(request.DNI);

            if (!validatedDNI)
            {
                return BadRequest("El DNI no es válido.");
            }

            bool userExists = _validations.UserExists(request.Name, request.Email, request.DNI);

            if (userExists)
            {
                return NotFound("El usuario ya existe.");
            }

            var requestHashed = _userService.RequestHashed(request);

            bool userSaved = _userService.SaveUser(requestHashed);

            if (!userSaved)
            {
                return StatusCode(500, "El usuario no se ha registrado.");
            }

            return Ok("El usuario se ha registrado correctamente");
        }

        [HttpPost("DavxeShop/login")]
        public IActionResult LogIn([FromBody] LogInRequest request)
        {

            if (request == null || HasNullOrEmptyProperties(request))
            {
                return BadRequest("El contenido de la petición está incompleto.");
            }

            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest("El email no es válido.");
            }

            bool correctUser = _userService.CorrectUser(request);

            if (!correctUser)
            {
                return StatusCode(500, "El usuario no es correcto.");
            }

            var token = _userService.GenerateToken(request.Email);

            if (token == null)
            {
                return StatusCode(500, "El token no ha sido creado.");
            }

            bool stored = _userService.StoreSession(token, _userService.GetUserIdByEmail(request.Email) ?? 0);

            if (!stored)
            {
                return StatusCode(500, "La sesion no se ha guardado correctamente.");
            }

            return Ok(token);
        }

        [HttpPost("DavxeShop/logout")]
        public IActionResult LogOut([FromBody] string token)
        {
            if (token == null)
            {
                return BadRequest("El contenido de la petición está incompleto.");
            }

            var loggedOut = _userService.LogOut(token);

            if (!loggedOut)
            {
                return StatusCode(500, "La sesion no se ha cerrado correctamente.");
            }

            return Ok();
        }

        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}
