using Gorrilla_Caps_Backend.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    [Authorize]
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
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Proveedor.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ProveedorController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProveedorController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProveedorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProveedorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
