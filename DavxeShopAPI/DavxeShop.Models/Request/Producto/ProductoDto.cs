namespace DavxeShop.Models.Request.Producto
{
    public class ProductoDto
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string Categoria { get; set; }
        public string ImagenUrl { get; set; }
        public int UserId { get; set; }
    }

}
