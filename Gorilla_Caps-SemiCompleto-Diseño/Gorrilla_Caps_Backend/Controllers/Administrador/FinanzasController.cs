using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanzasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FinanzasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Finanzas
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var ventasPorMes = await _context.Venta
                .Join(
                    _context.DetVenta,
                    venta => venta.Id,
                    detVenta => detVenta.VentaId,
                    (venta, detVenta) => new { Venta = venta, DetVenta = detVenta }
                )
                .Where(v => v.Venta.Estatus)
                .Select(v => new { Mes = v.Venta.Fecha.ToString("MM-yyyy"), Total = v.DetVenta.Cantidad * v.DetVenta.Precio })
                .ToListAsync();

            var comprasPorMes = await _context.Compra
                .Join(
                    _context.DetCompra,
                    compra => compra.Id,
                    detCompra => detCompra.CompraId,
                    (compra, detCompra) => new { Compra = compra, DetCompra = detCompra }
                )
                .Where(c => c.Compra.Estatus)
                .Select(c => new { Mes = c.Compra.Fecha.ToString("MM-yyyy"), Total = c.DetCompra.Precio })
                .ToListAsync();


            var sumaVentasPorMes = ventasPorMes
                 .GroupBy(v => v.Mes)
                 .Select(g => new { Mes = g.Key, SumaTotal = g.Sum(v => v.Total) })
                 .ToList();

            var sumaComprasPorMes = comprasPorMes
                .GroupBy(c => c.Mes)
                .Select(g => new { Mes = g.Key, SumaTotal = g.Sum(c => c.Total) })
                .ToList();

            var utilidadMensual = sumaVentasPorMes
                .Join(sumaComprasPorMes, v => v.Mes, c => c.Mes, (v, c) => new { Mes = v.Mes, Utilidad = Convert.ToDecimal(v.SumaTotal) - c.SumaTotal })
                .ToList();

            return Ok(new
            {
                VentasPorMes = ventasPorMes,
                ComprasPorMes = comprasPorMes,
                SumaVentasPorMes = sumaVentasPorMes,
                SumaComprasPorMes = sumaComprasPorMes,
                UtilidadMensual = utilidadMensual
            });
        }



        [HttpGet("generarPDF")]
        public async Task<ActionResult> GenerarPDF(string fechaInicio, string fechaFin)
        {
            DateTime fechaInicioDateTime, fechaFinDateTime;

            if (!DateTime.TryParse(fechaInicio, out fechaInicioDateTime) || !DateTime.TryParse(fechaFin, out fechaFinDateTime))
            {
                return BadRequest("Las fechas proporcionadas no tienen un formato válido.");
            }

            var ventas = await _context.Venta
                .Join(
                    _context.DetVenta,
                    venta => venta.Id,
                    detVenta => detVenta.VentaId,
                    (venta, detVenta) => new { Venta = venta, DetVenta = detVenta }
                )
                .Join(
                    _context.Producto,
                    v => v.DetVenta.ProductoId,
                    producto => producto.Id,
                    (v, producto) => new ReporteVentas
                    {
                        Fecha = v.Venta.Fecha,
                        Producto = producto.Nombre,
                        Modelo = producto.Modelo,
                        Cantidad = v.DetVenta.Cantidad,
                        Precio = Convert.ToDecimal(v.DetVenta.Precio),
                        Total = v.DetVenta.Cantidad * Convert.ToDecimal(v.DetVenta.Precio)
                    }
                )
                .Where(v => v.Fecha >= fechaInicioDateTime && v.Fecha <= fechaFinDateTime)
                .ToListAsync();

            var compras = await _context.Compra
                .Join(
                    _context.DetCompra,
                    compra => compra.Id,
                    detCompra => detCompra.CompraId,
                    (compra, detCompra) => new { Compra = compra, DetCompra = detCompra }
                )
                .Join(
                    _context.InventarioMateriaPrima,
                    c => c.DetCompra.MaterialId,
                    material => material.Id,
                    (c, material) => new ReporteCompras
                    {
                        Fecha = c.Compra.Fecha,
                        Proveedor = c.Compra.Proveedor.Nombre,
                        Material = material.Nombre,
                        Cantidad = c.DetCompra.Cantidad,
                        Total = c.DetCompra.Precio
                    }
                )
                .Where(c => c.Fecha >= fechaInicioDateTime && c.Fecha <= fechaFinDateTime)
                .ToListAsync();

            return Ok(new { Ventas = ventas, Compras = compras });
        }



    }
}
