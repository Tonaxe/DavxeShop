﻿using DavxeShop.Library.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api/DavxeShop")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IValidations _validations;
        private readonly IDashboardService _dashboardService;

        public DashboardController(IValidations validations, IDashboardService dashboardService)
        {
            _validations = validations;
            _dashboardService = dashboardService;
        }

        [HttpGet("dashboard/usuarios")]
        public IActionResult GetUsersData()
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

            var datos = _dashboardService.GetUsersData();

            if (datos == null)
            {
                return NotFound(new { message = "No hay datos de los usuarios." });
            }

            return Ok(new { datos = datos });
        }

        [HttpGet("dashboard/productos")]
        public IActionResult GetProductsData()
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

            var datos = _dashboardService.GetProductsData();

            if (datos == null)
            {
                return NotFound(new { message = "No hay datos de los procutos." });
            }

            return Ok(new { datos = datos });
        }

        [HttpGet("dashboard/ventas")]
        public IActionResult GetVentasData()
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

            var datos = _dashboardService.GetVentasData();

            if (datos == null)
            {
                return NotFound(new { message = "No hay datos de las ventas." });
            }

            return Ok(new { datos = datos });
        }

        [HttpGet("dashboard/chat")]
        public IActionResult GetChatData()
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

            var datos = _dashboardService.GetChatData();

            if (datos == null)
            {
                return NotFound(new { message = "No hay datos de los chats." });
            }

            return Ok(new { datos = datos });
        }

        private bool HasNullOrEmptyProperties(object obj)
        {
            return obj.GetType().GetProperties().Any(p => p.GetValue(obj) == null || (p.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(p.GetValue(obj) as string)));
        }
    }
}