namespace DavxeShop.Models.dbModels
{
    public class Rol
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
