namespace DavxeShop.Models.models
{
    public class ResumenVentasDto
    {
        public decimal VentasMensuales { get; set; }
        public decimal VentasMensualesTrend { get; set; }

        public decimal VentasTotales { get; set; }
        public decimal VentasTotalesTrend { get; set; }

        public decimal Ingresos { get; set; }
        public decimal IngresosTrend { get; set; }

        public decimal PromedioPorVenta { get; set; }
        public decimal PromedioPorVentaTrend { get; set; }

        public List<VentaSemanalDto> VentasSemanales { get; set; }
    }
}
