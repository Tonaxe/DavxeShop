using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace DavxeShop.Api.Controller
{
    [Route("api")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ITrenService _trenService;

        public ValuesController(ITrenService trenService)
        {
            _trenService = trenService;
        }

        [HttpGet("RecomendedTrains")]
        public IActionResult GetRecomendedTrains()
        {
            var recommendedTrains = _trenService.GetRecomendedTrains();

            if (recommendedTrains == null || !recommendedTrains.Any())
            {
                return NotFound("No recommended trains found");
            }

            return Ok(recommendedTrains);
        }
    }
}
