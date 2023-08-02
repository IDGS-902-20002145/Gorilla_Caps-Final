namespace Gorrilla_Caps_Backend.Models
{
    public class ReporteCompras
    {
        public DateTime Fecha { get; set; }
        public string Proveedor { get; set; }
        public string Material { get; set; }
        public int Cantidad { get; set; }
        public decimal Total { get; set; }
    }
}
