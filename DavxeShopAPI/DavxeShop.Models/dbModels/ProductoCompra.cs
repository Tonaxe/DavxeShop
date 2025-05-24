namespace DavxeShop.Models.dbModels
{
    public class ProductoCompra
    {
        public int ProductoCompraId { get; set; }
        public int CompraId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }

        public Compra Compra { get; set; } = null!;
        public Productos Producto { get; set; } = null!;
    }
}
