using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models.Request.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api/DavxeShop")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidations _validations;

        public UserController(IUserService userService, IValidations validations)
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
                return NotFound(new { message = "El usuario no se ha encontrado." });
            }

            return Ok(new { users = users });
        }

        [HttpGet("users/{UserId}")]
        public IActionResult GetUser(int UserId)
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

            if (UserId <= 0)
            {
                return BadRequest(new { message = "El contenido de la petición está incompleto." });
            }

            var user = _userService.GetUser(UserId);

            if (user == null)
            {
                return NotFound(new { message = "El usuario no se ha encontrado." });
            }

            return Ok(new { user = user });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (request == null || HasNullOrEmptyProperties(request))
            {
                return BadRequest(new { message = "El contenido de la petición está incompleto." });
            }

            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest(new { message = "El email no es válido." });
            }

            bool validatedDNI = _validations.ValidDni(request.DNI);

            if (!validatedDNI)
            {
                return BadRequest(new { message = "El DNI no es válido." });
            }

            bool userExists = _validations.UserExists(request.Name, request.Email, request.DNI);

            if (userExists)
            {
                return NotFound(new { message = "El usuario ya existe." });
            }

            var requestHashed = _userService.RequestHashed(request);

            bool userSaved = _userService.SaveUser(requestHashed);

            if (!userSaved)
            {
                return StatusCode(500, new { message = "El usuario no se ha registrado." });
            }

            return Ok(new { message = "El usuario se ha registrado correctamente" });

        }

        [HttpPost("login")]
        public IActionResult LogIn([FromBody] LogInRequest request)
        {

            if (request == null || HasNullOrEmptyProperties(request))
            {
                return BadRequest(new { message = "El contenido de la petición está incompleto." });
            }

            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest(new { message = "El email no es válido." });
            }

            bool correctUser = _userService.CorrectUser(request);

            if (!correctUser)
            {
                return StatusCode(500, new { message = "El usuario no es correcto." });
            }

            var token = _userService.GenerateToken(request.Email);

            if (token == null)
            {
                return StatusCode(500, new { message = "El token no ha sido creado." });
            }

            bool stored = _userService.StoreSession(token, _userService.GetUserIdByEmail(request.Email) ?? 0);

            if (!stored)
            {
                return StatusCode(500, new { message = "La sesión no se ha guardado correctamente." });
            }

            return Ok(new { token = token });
        }

        [HttpPost("logout")]
        public IActionResult LogOut()
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

            var loggedOut = _userService.LogOut(token);

            if (!loggedOut)
            {
                return StatusCode(500, new { message = "La sesión no se ha cerrado correctamente." });
            }

            return Ok(new { message = "Operación realizada correctamente." });
        }

        [HttpPost("recover-password")]
        public IActionResult RecoverPassword([FromBody] string email)
        {
            bool validatedEmail = _validations.ValidEmail(email);

            if (!validatedEmail)
            {
                return BadRequest(new { message = "El email no es válido." });
            }

            if (!_userService.SendRecoveryCode(email))
            {
                return NotFound(new { message = "El correo no está registrado." });
            }

            return Ok(new { message = "Se ha enviado un correo con las instrucciones." });
        }

        [HttpPost("verifty-recover-password")]
        public IActionResult VerifyRecoverPassword([FromBody] VerifyRecoverPasswordRequest request)
        {
            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest(new { message = "El email no es válido." });
            }

            if (!_userService.VerifyRecoveryCode(request))
            {
                return NotFound(new { message = "El codigo no es correcto." });
            }

            return Ok(new { message = "El codigo es correcto." });
        }

        [HttpPatch("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest(new { message = "El email no es válido." });
            }

            if (!_userService.ResetPassword(request))
            {
                return NotFound(new { message = "La contraseña no se ha podido cambiar correctamente." });
            }

            return Ok(new { message = "La contraseña se ha cambiado correctamente." });
        }

       
        [HttpPatch("users/update-profile")]
        public IActionResult UpdateProfile([FromBody] UpdateProfileDto request)
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

            bool validatedEmail = _validations.ValidEmail(request.Email);

            if (!validatedEmail)
            {
                return BadRequest(new { message = "El email no es válido." });
            }

            bool validatedDNI = _validations.ValidDni(request.Dni);

            if (!validatedDNI)
            {
                return BadRequest(new { message = "El DNI no es válido." });
            }

            if (!_userService.UpdateUserProfile(request))
            {
                return StatusCode(500, new { message = "No se ha podido actualizar el perfil." });
            }

            return Ok(new { message = "Perfil actualizado correctamente." });
        }
        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}
