namespace DavxeShop.Models.dbModels
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Categoriaa { get; set; } = null!;

        public virtual ICollection<Productos> Productos { get; set; } = new List<Productos>();
    }
}
