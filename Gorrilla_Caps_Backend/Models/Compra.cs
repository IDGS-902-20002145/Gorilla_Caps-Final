using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Gorrilla_Caps_Backend.Models
{

    public class Compra
    {
        [Key]
        public int Id { get; set; }

        [Column("proveedor_id")]
        public int ProveedorId { get; set; }

        public DateTime Fecha { get; set; }
        public bool Estatus { get; set; }

        
        public List<DetCompra> DetCompra { get; set; }

        
        public Proveedor Proveedor { get; set; }
    }

}
