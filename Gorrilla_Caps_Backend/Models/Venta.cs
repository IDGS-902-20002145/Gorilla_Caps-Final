using System.ComponentModel.DataAnnotations;

namespace Gorrilla_Caps_Backend.Models
{
    public class Venta
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Fecha { get; set; }
        public bool Estatus { get; set; }
        public User User { get; set; }
    }
}
