using Gorrilla_Caps_Backend.Context;
using Gorrilla_Caps_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasPrimasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MateriasPrimasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var materiasPrimas = _context.InventarioMateriaPrima
                    .Where(mp => mp.Estatus == true)
                    .ToList();

                return Ok(materiasPrimas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}", Name = "Inventario")]
        public ActionResult Get(int id)
        {
            try
            {
                var inv = _context.InventarioMateriaPrima.FirstOrDefault(x => x.Id == id);
                return Ok(inv);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] InventarioMateriaPrima inv)
        {
            try
            {
                _context.InventarioMateriaPrima.Add(inv);
                _context.SaveChanges();
                return CreatedAtRoute("Inventario", new { id = inv.Id }, inv);
            }
            catch (Exception ex)
            {

                Console.WriteLine("Error en la entidad: " + ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] InventarioMateriaPrima inv)
        {
            try
            {
                if (inv.Id == id)
                {
                    _context.Entry(inv).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("Inventario", new { id = inv.Id }, inv);
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
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var inv = _context.InventarioMateriaPrima.FirstOrDefault(x => x.Id == id);
                if (inv != null)
                {
                    // Cambiar el estatus del registro a 0 (eliminación lógica)
                    inv.Estatus = false;

                    _context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest("El registro no existe.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
