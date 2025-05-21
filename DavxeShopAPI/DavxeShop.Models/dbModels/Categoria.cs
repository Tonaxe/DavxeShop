namespace DavxeShop.Models.dbModels
{
    public class Categoria
    {
        public int CategoriaId { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Productos> Productos { get; set; } = new List<Productos>();
    }
}
