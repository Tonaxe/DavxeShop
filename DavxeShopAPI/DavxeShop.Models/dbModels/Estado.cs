namespace DavxeShop.Models.dbModels
{
    public class Estado
    {
        public int EstadoId { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Productos> Productos { get; set; } = new List<Productos>();
    }
}
