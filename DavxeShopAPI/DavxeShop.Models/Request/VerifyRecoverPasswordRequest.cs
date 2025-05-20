namespace DavxeShop.Models.Request
{
    public class VerifyRecoverPasswordRequest
    {
        public string Email { get; set; }
        public string RecoveryCode { get; set; }
    }
}
