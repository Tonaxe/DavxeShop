namespace DavxeShop.Models.Request.User
{
    public class LogInRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
