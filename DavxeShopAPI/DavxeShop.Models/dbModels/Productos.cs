namespace DavxeShop.Models.dbModels
{
    public class Productos
    {
        public int ProductoId { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Descripcion { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string? ImagenUrl { get; set; }
        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; } = null!;

        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
