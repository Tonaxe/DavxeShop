namespace DavxeShop.Models.models
{
    public class ProductoDTO
    {
        public int ProductoId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public int Categoria { get; set; }
        public string ImagenUrl { get; set; }
        public int UserId { get; set; }
        public string UserNombre { get; set; }
        public string UserCiudad { get; set; }
        public int Estado { get; set; }
        public bool Comprado { get; set; }
        public bool Favorito { get; set; }
    }
}
