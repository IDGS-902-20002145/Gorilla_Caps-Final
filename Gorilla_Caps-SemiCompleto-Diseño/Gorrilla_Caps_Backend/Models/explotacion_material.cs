using System.ComponentModel.DataAnnotations;

namespace Gorrilla_Caps_Backend.Models
{
    public class explotacion_material
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public int MaterialId { get; set; }
        public double CantidadUsada { get; set; }
        public double CantidadIndividual { get; set; }

    }
}
