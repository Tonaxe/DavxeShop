namespace DavxeShop.Models.dbModels
{
    public class Compra
    {
        public int CompraId { get; set; }
        public int UserId { get; set; }
        public DateTime FechaCompra { get; set; }
        public decimal Total { get; set; }
        public string? DireccionEnvio { get; set; }
        public string? CiudadEnvio { get; set; }
        public string? Email { get; set; }
        public string? Pais { get; set; }
        public string? CodigoPostal { get; set; }
        public string? EstadoCompra { get; set; }
        public string NumeroPedido { get; set; } = string.Empty;


        public User User { get; set; } = null!;
        public ICollection<ProductoCompra> ProductosCompra { get; set; } = new List<ProductoCompra>();
    }
}