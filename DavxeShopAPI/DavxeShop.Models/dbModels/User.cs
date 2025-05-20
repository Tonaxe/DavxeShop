namespace DavxeShop.Models.dbModels
{
    public class User
    {
        public int UserId { get; set; }
        public string DNI { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string City { get; set; }
        public string Password { get; set; } = null!;
        public int RolId { get; set; }
        public string ImageBase64 { get; set; } = null!;

        public virtual Rol Rol { get; set; }

        public virtual ICollection<Productos> Productos { get; set; } = new List<Productos>();
        public virtual ICollection<RecoverCode> RecoverCodes { get; set; } = new List<RecoverCode>();
        public virtual ICollection<Session> Sessions { get; set; } = new List<Session>();
    }
}
