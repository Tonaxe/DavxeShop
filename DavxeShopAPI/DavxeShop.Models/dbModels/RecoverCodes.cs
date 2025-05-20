namespace DavxeShop.Models.dbModels
{
    public class RecoverCode
    {
        public int RecoveryCodeId { get; set; }
        public int UserId { get; set; }
        public string RecoveryCode { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedCode { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
