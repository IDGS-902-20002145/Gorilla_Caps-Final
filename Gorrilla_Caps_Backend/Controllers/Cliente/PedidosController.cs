using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gorrilla_Caps_Backend.Controllers.Cliente
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : Controller
    {
        private readonly AppDbContext _context;
        public PedidosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("{id}", Name = "getPedidos")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var detPedido = await _context.DetPedido.
                    Include(p => p.Pedido).
                    Include(p => p.Producto).
                    Where(p => p.Pedido.UserId == id && p.Pedido.Estatus == 1)
                    .ToListAsync();

                return Ok(detPedido);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PedidoFull pf)
        {
            try
            {
                var pedido = new Pedido
                {
                    UserId = pf.UserId,
                    Fecha = pf.Fecha,
                    Estatus = pf.Estatus
                };

                // Guardar el pedido en la base de datos para obtener el pedido.Id generado automáticamente
                _context.Pedido.Add(pedido);
                await _context.SaveChangesAsync();

                // Utiliza Attach para indicar que el Producto ya existe en la base de datos
                _context.Attach(pf.Producto);

                var detpedido = new DetPedido
                {
                    PedidoId = pedido.Id,
                    ProductoId = pf.Producto.Id,
                    Cantidad = pf.Cantidad,
                    Pedido = pedido,
                    Producto = pf.Producto
                };

                // Agregar el detpedido a la tabla 'DetPedido' y guardar en la base de datos
                _context.DetPedido.Add(detpedido);
                await _context.SaveChangesAsync();

                return CreatedAtRoute("GetPedidos", new { id = pedido.Id }, pedido);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        //Ahora hacemos un put para eliminar de forma lógica un pedido
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var pedido = await _context.Pedido.FirstOrDefaultAsync(p => p.Id == id);
                if (pedido == null)
                {
                    return NotFound();
                }
                pedido.Estatus = 0;
                _context.Entry(pedido).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("Pagar/{id}")]
        //[Authorize] // Agrega el atributo [Authorize] para proteger el acceso a este método
        public IActionResult Pagar(int id)
        {
            try
            {
                var pedido = _context.Pedido
                    .Include(p => p.DetPedido)
                        .ThenInclude(d => d.Producto)
                    .Where(p => p.Id == id && p.Estatus == 1)
                    .ToList();

                if (pedido.Count == 0)
                {
                    return NotFound("No se encontró el pedido o no tiene el estatus adecuado.");
                }

                // Mapea los datos necesarios para la respuesta
                var detallesProductos = new List<Dictionary<string, object>>();
                double total = 0;

                foreach (var p in pedido)
                {
                    foreach (var detPedido in p.DetPedido)
                    {
                        var prod = detPedido.Producto;
                        var cantidad = detPedido.Cantidad;

                        if (prod.stock_existencia >= cantidad)
                        {
                            total += prod.Precio * cantidad;
                            detallesProductos.Add(new Dictionary<string, object>
                            {
                                { "id", prod.Id },
                                { "nombre", prod.Nombre },
                                { "precio", prod.Precio },
                                { "modelo", prod.Modelo },
                                { "descripcion", prod.Descripcion },
                                { "cantidad", cantidad },
                                { "imagen", prod.Imagen }
                            });
                        }
                    }
                }

                var response = new
                {
                    detallesProductos,
                    total
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        //Creamos una clase para todos los datos de un pedido, producto y usuario
        public class PedidoFull
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public DateTime Fecha { get; set; }
            public int Estatus { get; set; }
            public int Cantidad { get; set; }
            public Producto Producto { get; set; }
        }
    }
}
