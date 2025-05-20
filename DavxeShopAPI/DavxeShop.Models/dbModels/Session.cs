namespace DavxeShop.Models.dbModels
{
    public class Session
    {
        public int SessionId { get; set; }
        public int UserId { get; set; }
        public string? Token { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Ended { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
