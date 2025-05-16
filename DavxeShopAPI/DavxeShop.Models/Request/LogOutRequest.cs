namespace DavxeShop.Models.Request
{
    public class LogOutRequest
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}
