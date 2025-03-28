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
                return NotFound("No users found");
            }

            return Ok(users);
        }


        [HttpGet("users/{dni}")]
        public IActionResult GetUser(string dni)
        {
            var users = _userService.GetUser(dni);

            if (users == null)
            {
                return NotFound("No user found");
            }

            return Ok(users);
        }
    }
}
