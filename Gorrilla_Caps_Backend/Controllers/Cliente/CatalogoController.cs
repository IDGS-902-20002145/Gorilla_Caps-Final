using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CatalogoController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                // Obtener todos los productos activos (Estatus = 1) de la base de datos
                var productos = _context.Producto.Where(p => p.Estatus == true).ToList();

                return Ok(productos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener los productos: " + ex.Message);
            }
        }

        //metodo para obtener los productos por id
        [HttpGet("{id}")]
        public IActionResult ObtenerProducto(int id)
        {
            try
            {
                // Buscar el producto por su ID en la base de datos
                var producto = _context.Producto.Find(id);
                if (producto == null)
                {
                    return NotFound("No se encontró el producto.");
                }

                return Ok(producto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener el producto: " + ex.Message);
            }
        }
    }
}