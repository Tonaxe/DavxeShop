namespace DavxeShop.Models
{
    public class RecoverCodes
    {
        public int RecoveryCodeId { get; set; }
        public int UserId { get; set; }
        public string RecoveryCode { get; set; }
        public string Email { get; set; }
        public DateTime CreatedCode { get; set; }
    }
}
