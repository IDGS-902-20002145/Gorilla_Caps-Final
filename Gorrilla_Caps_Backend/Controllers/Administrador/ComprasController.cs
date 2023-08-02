using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Gorrilla_Caps_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ComprasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ComprasController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("RegistrarCompra")]
        public async Task<IActionResult> RegistrarCompra(CompraRequest compraRequest)
        {
            try
            {
                // Verificar si el proveedor existe en la base de datos
                var proveedorExistente = await _context.Proveedor.FirstOrDefaultAsync(p => p.Id == compraRequest.ProveedorId);
                if (proveedorExistente == null)
                {
                    return BadRequest("El proveedor no existe en la base de datos.");
                }

                // Crear la nueva compra y guardarla en la base de datos
                var compra = new Compra
                {
                    Fecha = DateTime.Now,
                    Estatus = false,
                    ProveedorId = compraRequest.ProveedorId
                };
                _context.Compra.Add(compra);
                await _context.SaveChangesAsync();

                // Crear los detalles de compra
                foreach (var detalle in compraRequest.DetCompra)
                {
                    // Verificar si el material existe en la base de datos
                    var materialExistente = await _context.InventarioMateriaPrima.FirstOrDefaultAsync(m => m.Id == detalle.MaterialId);
                    if (materialExistente == null)
                    {
                        // Si el material no existe, retorna un error.
                        return BadRequest($"El material {detalle.MaterialId} no existe en la base de datos.");
                    }
                    var precioCalculado = detalle.Cantidad * detalle.Precio;
                    // Guardar el detalle de compra con el ID de la compra recién creada
                    var detCompra = new DetCompra
                    {
                        CompraId = compra.Id,
                        MaterialId = detalle.MaterialId,
                        Cantidad = detalle.Cantidad,
                        Precio = Convert.ToDecimal(precioCalculado)
                    };
                    _context.DetCompra.Add(detCompra);
                }

                await _context.SaveChangesAsync();

                return Ok(compra);
            }
            catch (DbUpdateException ex)
            {
                // Capturar la excepción interna y proporcionar más detalles
                return StatusCode(500, "Error al guardar los cambios en la base de datos: " + ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        // Clase utilizada para recibir el JSON de la solicitud de compra
        public class CompraRequest
        {
            public int ProveedorId { get; set; }
            public List<DetalleCompra> DetCompra { get; set; }
        }

        // Clase utilizada para representar los detalles de compra
        public class DetalleCompra
        {
            public int MaterialId { get; set; }
            public int Cantidad { get; set; }
            public decimal Precio { get; set; }
        }

        //Metodo para confirmar la compra
        [HttpPut("ConfirmarCompra/{id}")]
        public async Task<IActionResult> ConfirmarCompra(int id)
        {
            try
            {
                // Buscar la compra por su ID
                var compra = await _context.Compra.Include(c => c.DetCompra).FirstOrDefaultAsync(c => c.Id == id);

                // Si la compra no existe, retorna un error
                if (compra == null)
                {
                    return NotFound($"No se encontró la compra con ID {id}.");
                }

                // Verificar si la compra ya ha sido confirmada
                if (compra.Estatus)
                {
                    return BadRequest($"La compra con ID {id} ya ha sido confirmada previamente.");
                }

                // Actualizar el estatus de la compra a 1 (confirmada) y guardar los cambios en la base de datos
                compra.Estatus = true;
                _context.Compra.Update(compra);
                await _context.SaveChangesAsync();

                // Recorrer los detalles de la compra y quitar la cantidad de materiales del inventario
                foreach (var detalle in compra.DetCompra)
                {
                    var material = await _context.InventarioMateriaPrima.FirstOrDefaultAsync(m => m.Id == detalle.MaterialId);
                    if (material != null)
                    {
                        material.Cantidad += detalle.Cantidad;
                    }
                    else
                    {
                        // Manejar el caso en que no se encuentre el material en el inventario
                        return BadRequest($"El material {detalle.MaterialId} no existe en el inventario.");
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(compra);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        //Metodo para obtener todas las compras
        [HttpGet("ObtenerComprasRealizadas")]
        public async Task<IActionResult> ObtenerComprasRealizadas()
        {
            try
            {
                var comprasRealizadas = await _context.Compra
                    .Where(c => c.Estatus) // Filtrar solo compras con estatus en 1 (realizadas)
                    .Include(c => c.Proveedor)
                    .Include(c => c.DetCompra)
                        .ThenInclude(dc => dc.Material)
                    .ToListAsync();

                return Ok(comprasRealizadas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("ObtenerComprasNoConfirmadas")]
        public async Task<IActionResult> ObtenerComprasNoConfirmadas()
        {
            try
            {
                var comprasNoConfirmadas = await _context.Compra
                    .Where(c => !c.Estatus) // Filtrar solo compras con estatus en 0 (no confirmadas)
                    .Include(c => c.Proveedor)
                    .Include(c => c.DetCompra)
                        .ThenInclude(dc => dc.Material)
                    .ToListAsync();

                return Ok(comprasNoConfirmadas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("ObtenerCompras")]
        public async Task<IActionResult> ObtenerCompras()
        {
            try
            {
                var compras = await _context.Compra
                    .Include(c => c.Proveedor)
                    .Include(c => c.DetCompra)
                        .ThenInclude(dc => dc.Material)
                    .ToListAsync();

                return Ok(compras);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }   

    }
}
