using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Gorrilla_Caps_Backend.Models
{
    public class DetCompra
    {
        [Key]
        public int Id { get; set; }

        [Column("compra_id")]
        public int CompraId { get; set; }

        [Column("material_id")]
        public int MaterialId { get; set; }

        public int Cantidad { get; set; }
        public double Precio { get; set; }

        [JsonIgnore] // Ignora la propiedad Compra al serializar
        public Compra Compra { get; set; }

        
        public InventarioMateriaPrima Material { get; set; }
    }
}
