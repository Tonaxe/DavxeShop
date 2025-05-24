namespace DavxeShop.Models.models
{
    public class CrearCompraDto
    {
        public int UserId { get; set; }
        public string DireccionEnvio { get; set; } = string.Empty;
        public string Ciudad { get; set; } = string.Empty;
        public string CodigoPostal { get; set; } = string.Empty;
        public string Pais { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public string Email { get; set; } = string.Empty;
        public List<int> ProductoIds { get; set; } = new();
    }
}
