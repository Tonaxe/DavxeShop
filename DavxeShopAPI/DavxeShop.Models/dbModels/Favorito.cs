namespace DavxeShop.Models.dbModels
{
    public class Favorito
    {
        public int FavoritoId { get; set; }
        public int UserId { get; set; }
        public int ProductoId { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual Productos Producto { get; set; } = null!;
    }
}
