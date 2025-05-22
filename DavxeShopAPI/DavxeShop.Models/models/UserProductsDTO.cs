namespace DavxeShop.Models.models
{
    public class UserProductsDTO
    {
        public int UserId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Foto { get; set; } = null!;
        public List<ProductoResumenDTO> Productos { get; set; } = new();
    }
}
