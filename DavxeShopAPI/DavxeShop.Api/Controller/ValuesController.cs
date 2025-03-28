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

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();

            if (users == null || !users.Any())
            {
                return NotFound("El usuario no se ha encontrado.");
            }

            return Ok(users);
        }

        [HttpGet("users/{UserId}")]
        public IActionResult GetUser(int UserId)
        {
            var users = _userService.GetUser(UserId);

            if (users == null)
            {
                return NotFound("El usuario no se ha encontrado.");
            }

            return Ok(users);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            bool validatedEmail = _validations.ValidEmail(request.Email);
            bool validatedDNI = _validations.ValidDni(request.DNI);

            if (!validatedEmail)
            {
                return BadRequest("El email no es válido.");
            }

            if (!validatedDNI)
            {
                return BadRequest("El DNI no es válido.");
            }

            bool userExists = _validations.UserExists(request.Name, request.Email, request.DNI);

            if (!userExists)
            {
                return BadRequest("El usuario no existe.");
            }

            var registered = _userService.Register(request);

            if (registered == null)
            {
                return NotFound("El usuario no se ha registrado.");
            }

            return Ok(registered);
        }
    }
}
