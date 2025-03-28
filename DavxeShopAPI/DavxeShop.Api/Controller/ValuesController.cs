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

        public ValuesController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();

            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(users);
        }

        [HttpGet("users/{UserId}")]
        public IActionResult GetUser(int UserId)
        {
            var users = _userService.GetUser(UserId);

            if (users == null)
            {
                return NotFound("No user found.");
            }

            return Ok(users);
        }

        [HttpPost("login")]
        public IActionResult LogIn()
        {
            var logged = _userService.LogIn();

            if (logged == null)
            {
                return NotFound("User was not logged.");
            }

            return Ok(logged);
        }
    }
}
