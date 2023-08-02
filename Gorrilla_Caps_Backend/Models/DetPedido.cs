using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gorrilla_Caps_Backend.Models
{
    public class DetPedido
    {
        [Key]
        public int Id { get; set; }

        [Column("pedido_id")]
        public int PedidoId { get; set; }

        [Column("producto_id")]
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public Pedido Pedido { get; set; }
        public Producto Producto { get; set; }
        
    }
}