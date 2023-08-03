using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
                    Where(p => p.Pedido.UserId == id && p.Pedido.Estatus == 1).
                    ToListAsync();

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
                decimal total = 0;

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


        [HttpPut("PagarAE/{id}")]
        public async Task<ActionResult> PagarAEfectivo(int id)
        {
            try
            {
                var pedido = await _context.Pedido
                    .Include(p => p.DetPedido)
                    .ThenInclude(d => d.Producto)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (pedido == null || pedido.Estatus != 1)
                {
                    return NotFound("No se encontró el pedido o no tiene el estatus adecuado.");
                }

                // Actualizar estatus del pedido a 2 (pago completado)
                pedido.Estatus = 2;
                await _context.SaveChangesAsync();

                // Insertar en tabla Venta
                var venta = new Venta
                {
                    UserId = pedido.UserId,
                    Fecha = DateTime.Now.Date
                };
                _context.Venta.Add(venta);
                await _context.SaveChangesAsync();

                // Insertar detalles de venta (DetVenta) y actualizar el stock de productos
                foreach (var detPedido in pedido.DetPedido)
                {
                    var prod = detPedido.Producto;

                    if (prod.stock_existencia >= detPedido.Cantidad)
                    {
                        var detVenta = new DetVenta
                        {
                            VentaId = venta.Id,
                            ProductoId = prod.Id,
                            Cantidad = detPedido.Cantidad,
                            Precio = prod.Precio
                        };
                        _context.DetVenta.Add(detVenta);
                        prod.stock_existencia -= detPedido.Cantidad;
                    }
                }

                await _context.SaveChangesAsync();

             
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("PagarTA/{id}")]
        public async Task<IActionResult> PagoTarjeta([FromForm] int id)
        {
            try
            {
                var pedido = await _context.Pedido.FirstOrDefaultAsync(p => p.Id == id);

                if (pedido == null)
                {
                    return NotFound("No se encontró el pedido.");
                }

                // Cambiar estatus del pedido a 2
                pedido.Estatus = 2;
                await _context.SaveChangesAsync();

                // Insertar en tabla Venta
                var venta = new Venta
                {
                    UserId = pedido.UserId,
                    Fecha = DateTime.Now.Date
                };
                _context.Venta.Add(venta);
                await _context.SaveChangesAsync();

                var productos = await _context.DetPedido
                    .Where(dp => dp.PedidoId == id)
                    .Include(dp => dp.Producto)
                    .ToListAsync();

                // Insertar detalle en tabla DetVenta
                foreach (var producto in productos)
                {
                    var prod = producto.Producto;
                    if (prod.stock_existencia >= producto.Cantidad)
                    {
                        var detVenta = new DetVenta
                        {
                            VentaId = venta.Id,
                            ProductoId = prod.Id,
                            Cantidad = producto.Cantidad,
                            Precio = prod.Precio
                        };
                        _context.DetVenta.Add(detVenta);
                        prod.stock_existencia -= producto.Cantidad;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("pagar_todo")]
        public async Task<IActionResult> PagarTodo()
        {
            try
            {
                var currentUserId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                var pedidosDisponibles = await _context.Pedido
                    .Where(p => p.UserId == currentUserId && p.Estatus == 1)
                    .Include(p => p.DetPedido)
                    .ThenInclude(d => d.Producto)
                    .ToListAsync();

                var detProductos = new List<Dictionary<string, object>>();
                decimal total = 0;
                var productosSinExistenciasNombres = new List<string>();

                foreach (var pedido in pedidosDisponibles)
                {
                    foreach (var producto in pedido.DetPedido)
                    {
                        var prod = producto.Producto;
                        if (producto.Cantidad > prod.stock_existencia)
                        {
                            productosSinExistenciasNombres.Add(prod.Nombre);
                        }
                        else
                        {
                            if (detProductos.Any(d => d["id"].ToString() == prod.Id.ToString()))
                            {
                                var existingDetProducto = detProductos.First(d => d["id"].ToString() == prod.Id.ToString());
                                existingDetProducto["cantidad"] = Convert.ToInt32(existingDetProducto["cantidad"]) + producto.Cantidad;
                            }
                            else
                            {
                                detProductos.Add(new Dictionary<string, object>
                        {
                            { "id", prod.Id },
                            { "nombre", prod.Nombre },
                            { "modelo", prod.Modelo },
                            { "precio", prod.Precio },
                            { "descripcion", prod.Descripcion },
                            { "cantidad", producto.Cantidad },
                            { "imagen", prod.Imagen }
                        });
                            }
                            total += prod.Precio * producto.Cantidad;
                        }
                    }
                }

                if (productosSinExistenciasNombres.Any())
                {
                    productosSinExistenciasNombres = productosSinExistenciasNombres.Distinct().ToList();
                    // Asegúrate de que estés retornando una respuesta JSON en el formato esperado
                    return BadRequest(new { message = $"No hay suficiente stock para los productos: {string.Join(", ", productosSinExistenciasNombres)}" });
                }

                return Ok(new { detProductos, pedidos = pedidosDisponibles, total });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
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
