using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gorrilla_Caps_Backend.Models
{
    public class InventarioMateriaPrima
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public double Cantidad { get; set; }
        public double Stock_Minimo { get; set; }
        public bool Estatus { get; set; }
    }
}
