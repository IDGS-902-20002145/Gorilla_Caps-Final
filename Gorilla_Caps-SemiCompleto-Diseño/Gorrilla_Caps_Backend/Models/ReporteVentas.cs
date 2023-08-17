namespace Gorrilla_Caps_Backend.Models
{
    public class ReporteVentas
    {
        public DateTime Fecha { get; set; }
        public string Producto { get; set; }
        public string Modelo { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
        public decimal Total { get; set; }
    }
}
