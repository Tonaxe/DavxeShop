namespace DavxeShop.Models.Request.User
{
    public class VerifyRecoverPasswordRequest
    {
        public string Email { get; set; }
        public string RecoveryCode { get; set; }
    }
}
