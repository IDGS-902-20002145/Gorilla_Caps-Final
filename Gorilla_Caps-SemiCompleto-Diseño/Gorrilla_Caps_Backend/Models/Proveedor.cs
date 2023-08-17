using System.ComponentModel.DataAnnotations;

namespace Gorrilla_Caps_Backend.Models
{
    public class Proveedor
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public bool Active { get; set; }
    }
}
