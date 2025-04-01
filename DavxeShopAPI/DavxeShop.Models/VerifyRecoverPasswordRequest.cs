namespace DavxeShop.Models
{
    public class VerifyRecoverPasswordRequest
    {
        public string Email { get; set; }
        public string RecoveryCode { get; set; }
    }
}
