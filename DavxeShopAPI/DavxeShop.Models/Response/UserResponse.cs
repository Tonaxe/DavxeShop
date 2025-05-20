namespace DavxeShop.Models.Response
{
    public class UserBasicDto
    {
        public int UserId { get; set; }
        public string DNI { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string City { get; set; }
        public int RolId { get; set; }
        public string ImageBase64 { get; set; }
    }
}
