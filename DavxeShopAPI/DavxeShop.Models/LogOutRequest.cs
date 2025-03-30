namespace DavxeShop.Models
{
    public class LogOutRequest
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}
