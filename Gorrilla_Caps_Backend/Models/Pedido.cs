using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace Gorrilla_Caps_Backend.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }
        public DateTime Fecha { get; set; }
        public int Estatus { get; set; }
        [JsonIgnore]
        public List<DetPedido> DetPedido { get; set; }

        public string toString()
        {
            StringBuilder sb = new StringBuilder();
            foreach (var item in DetPedido)
            {
                sb.AppendLine(item.ToString());
            }
            return "Id: " + Id + " UserId: " + UserId + " Fecha: " + Fecha + " Estatus: " + Estatus+ " detPedido"+ sb;
        }
    }
}
