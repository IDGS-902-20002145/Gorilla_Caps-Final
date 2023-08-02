using System.ComponentModel.DataAnnotations;

namespace Gorrilla_Caps_Backend.Models
{
    public class ExplotacionMaterial
    {
        [Key]
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public int MaterialId { get; set; }
        public float CantidadUsada { get; set; }
        public float CantidadIndividual { get; set; }
        public Producto Producto { get; set; }
        public InventarioMateriaPrima Material { get; set; }
    }
}
