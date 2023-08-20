using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Patterns;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasAController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasAController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/VentasA
        [HttpGet]
        public async Task<ActionResult> GetVentas()
        {
            
            try
            {
                // Obtener ventas pendientes
                var ventasPendientes = await _context.Venta
                    .Include(v => v.User) // Cargar los datos del usuario
                    .Where(v => v.Estatus == false)
                    .ToListAsync();

                var conteoVentasPendientes = await _context.Venta
                    .Where(v => v.Estatus == false)
                    .CountAsync();

                // Obtener ventas enviadas
                var ventasEnviadas = await _context.Venta
                    .Include(v => v.User) // Cargar los datos del usuario
                    .Where(v => v.Estatus == true)
                    .ToListAsync();

                var conteoVentasEnviadas = await _context.Venta
                    .Where(v => v.Estatus == true)
                    .CountAsync();

                return Ok(new
                {
                    VentasPendientes = ventasPendientes,
                    VentasEnviadas = ventasEnviadas,
                    ConteoVentasPendientes = conteoVentasPendientes,
                    ConteoVentasEnviadas = conteoVentasEnviadas
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // PUT: api/VentasA/ConfirmarEnvio/1
        [HttpPut("ConfirmarEnvio/{idVenta}")]
        public async Task<ActionResult> ConfirmarEnvio(int idVenta)
        {
            try
            {
                var venta = await _context.Venta.FirstOrDefaultAsync(v => v.Id == idVenta);

                if (venta == null)
                {
                    return NotFound("Venta no encontrada");
                }

                venta.Estatus = true;
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("detalleVenta")]
        public async Task<ActionResult> DetalleVenta(int idVenta, [FromQuery] string estatus)
        {
            try
            {
                var detalleVentas = await _context.Venta
                    .Join(_context.DetVenta, venta => venta.Id, detVenta => detVenta.VentaId,
                        (venta, detVenta) => new { Venta = venta, DetVenta = detVenta })
                    .Join(_context.Producto, vdet => vdet.DetVenta.ProductoId, producto => producto.Id,
                        (vdet, producto) => new { VentaDet = vdet, Producto = producto })
                    .Where(vdetprod => vdetprod.VentaDet.Venta.Id == idVenta)
                    .Select(vdetprod => new DetVenta // Cambio DetalleVentaDto por DetVenta
                    {
                        Id = vdetprod.VentaDet.DetVenta.Id, // Incluyendo las propiedades de DetVenta
                        VentaId = vdetprod.VentaDet.DetVenta.VentaId,
                        ProductoId = vdetprod.VentaDet.DetVenta.ProductoId,
                        Cantidad = vdetprod.VentaDet.DetVenta.Cantidad,
                        Precio = vdetprod.VentaDet.DetVenta.Precio,
                        Venta = vdetprod.VentaDet.Venta, // Incluyendo el objeto Venta relacionado
                        Producto = vdetprod.Producto // Incluyendo el objeto Producto relacionado
                    })
                    .ToListAsync();

                return Ok(detalleVentas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
