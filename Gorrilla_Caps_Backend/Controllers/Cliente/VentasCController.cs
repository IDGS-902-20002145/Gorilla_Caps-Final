using System;
using System.Collections.Generic;
using System.Linq;
using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gorrilla_Caps_Backend.Controllers.Cliente
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasCController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasCController(AppDbContext context)
        {
            _context = context;
        }

        public class VentasDto
        {
            public int Id { get; set; }
            public DateTime Fecha { get; set; }
            public Dictionary<DateTime, Dictionary<string, MisComprasProductoDto>> Productos { get; set; }
        }

        [HttpGet]
        public ActionResult GetMisCompras()
        {
            int currentUserId = GetCurrentUserId();

            List<Venta> ventasPorAprobar = _context.Venta
                .Where(v => v.UserId == currentUserId && v.Estatus == false)
                .ToList();

            List<VentasDto> ventasPA = new List<VentasDto>();

            foreach (var venta in ventasPorAprobar)
            {
                List<DetVenta> detalles = _context.DetVenta
                    .Where(d => d.VentaId == venta.Id)
                    .ToList();

                var productosDict = new Dictionary<DateTime, Dictionary<string, MisComprasProductoDto>>();

                foreach (var detalle in detalles)
                {
                    Producto producto = _context.Producto.FirstOrDefault(p => p.Id == detalle.ProductoId);
                    if (producto == null) continue;

                    var key = (venta.Fecha, producto.Nombre, producto.Id, producto.Imagen);

                    if (productosDict.TryGetValue(venta.Fecha, out var productosFechaDict))
                    {
                        if (productosFechaDict.TryGetValue(producto.Nombre, out var productoDto))
                        {
                            productoDto.Cantidad += detalle.Cantidad;
                        }
                        else
                        {
                            productosFechaDict[producto.Nombre] = new MisComprasProductoDto
                            {
                                Cantidad = detalle.Cantidad,
                                Precio = Convert.ToDecimal(producto.Precio)
                            };
                        }
                    }
                    else
                    {
                        productosDict[venta.Fecha] = new Dictionary<string, MisComprasProductoDto>
                        {
                            { producto.Nombre, new MisComprasProductoDto
                                {
                                    Cantidad = detalle.Cantidad,
                                    Precio = Convert.ToDecimal(producto.Precio)
                                }
                            }
                        };
                    }
                }

                ventasPA.Add(new VentasDto
                {
                    Id = venta.Id,
                    Fecha = venta.Fecha,
                    Productos = productosDict
                });
            }



            List<Venta> ventasAprobadas = _context.Venta
               .Where(v => v.UserId == currentUserId && v.Estatus == true)
               .ToList();

            List<VentasDto> ventasA = new List<VentasDto>();

            foreach (var venta in ventasAprobadas)
            {
                List<DetVenta> detalles = _context.DetVenta
                    .Where(d => d.VentaId == venta.Id)
                    .ToList();

                var productosDict = new Dictionary<DateTime, Dictionary<string, MisComprasProductoDto>>();

                foreach (var detalle in detalles)
                {
                    Producto producto = _context.Producto.FirstOrDefault(p => p.Id == detalle.ProductoId);
                    if (producto == null) continue;

                    var key = (venta.Fecha, producto.Nombre, producto.Id, producto.Imagen);

                    if (productosDict.TryGetValue(venta.Fecha, out var productosFechaDict))
                    {
                        if (productosFechaDict.TryGetValue(producto.Nombre, out var productoDto))
                        {
                            productoDto.Cantidad += detalle.Cantidad;
                        }
                        else
                        {
                            productosFechaDict[producto.Nombre] = new MisComprasProductoDto
                            {
                                Cantidad = detalle.Cantidad,
                                Precio = Convert.ToDecimal(producto.Precio)
                            };
                        }
                    }
                    else
                    {
                        productosDict[venta.Fecha] = new Dictionary<string, MisComprasProductoDto>
                        {
                            { producto.Nombre, new MisComprasProductoDto
                                {
                                    Cantidad = detalle.Cantidad,
                                    Precio = Convert.ToDecimal(producto.Precio)
                                }
                            }
                        };
                    }
                }

                ventasA.Add(new VentasDto
                {
                    Id = venta.Id,
                    Fecha = venta.Fecha,
                    Productos = productosDict
                });
            }

            // Código para ventasA aprobadas (similar a ventasPA)

            return Ok(new { VentasPA = ventasPA, VentasA = ventasA });
        }

        private int GetCurrentUserId()
        {
            // Implementa el método para obtener el ID del usuario actual
            // Puedes usar el HttpContext.User o cualquier otra forma de autenticación
            return 1; // Ejemplo: retorna un ID de usuario fijo
        }
    }

    public class MisComprasProductoDto
    {
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
    }
}
