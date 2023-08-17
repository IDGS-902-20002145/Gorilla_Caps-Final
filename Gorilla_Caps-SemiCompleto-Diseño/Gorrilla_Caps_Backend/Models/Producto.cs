using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gorrilla_Caps_Backend.Models
{

    public class Producto
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Color { get; set; }
        public string Modelo { get; set; }
        public decimal Precio { get; set; }
        public string Imagen { get; set; }
        public int stock_existencia { get; set; }
        public bool Estatus { get; set; }
        public List<explotacion_material> explotacion_material { get; set; }

        public Producto()
        {
            explotacion_material = new List<explotacion_material>();
        }
    }
}
