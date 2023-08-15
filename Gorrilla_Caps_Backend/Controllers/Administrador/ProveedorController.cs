using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    [Authorize(Policy = "Admin")]
    [ApiController]
    [Route("api/[controller]")]

    public class ProveedorController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProveedorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var proveedores = _context.Proveedor.ToList();
                return Ok(proveedores);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET api/<ProveedorController>/5
        [HttpGet("{id}", Name = "GetProveedor")]
        public IActionResult GetById(int id)
        {
            try
            {
                var proveedor = _context.Proveedor.FirstOrDefault(p => p.Id == id);
                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Add")]
        public IActionResult Post([FromBody] Proveedor proveedor)
        {
            try
            {

                _context.Proveedor.Add(proveedor);
                _context.SaveChanges();
                return CreatedAtRoute("GetProveedor", new { id = proveedor.Id }, proveedor);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // PUT api/<ProveedorController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Proveedor updateProveedor)
        {
            try
            {
                var proveedor = _context.Proveedor.FirstOrDefault(p => p.Id == id);
                if (proveedor == null)
                {
                    return NotFound();
                }

                proveedor.Nombre = updateProveedor.Nombre;
                proveedor.Email = updateProveedor.Email;
                proveedor.Direccion = updateProveedor.Direccion;
                proveedor.Telefono = updateProveedor.Telefono;
                proveedor.Active = updateProveedor.Active;

                _context.SaveChanges();
                return Ok(proveedor);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // DELETE api/<ProveedorController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {

            try
            {
                var proveedor = _context.Proveedor.FirstOrDefault(p => p.Id == id);

                if (proveedor != null)
                {
                    _context.Proveedor.Remove(proveedor);
                    _context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
