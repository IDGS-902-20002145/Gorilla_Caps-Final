using Gorrilla_Caps_Backend.Context;
using Microsoft.AspNetCore.Mvc;
using Gorrilla_Caps_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    [Authorize(Policy = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var users = _context.User.Where(u => u.Active).ToList();
                return Ok(users);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            try
            {
                var user = _context.User.FirstOrDefault(u => u.Id == id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            try
            {
                // Antes de agregar el usuario, establece la contraseña como hash
                user.SetPassword(user.Password);
                _context.User.Add(user);
                _context.SaveChanges();
                return CreatedAtRoute("GetUser", new { id = user.Id }, user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            try
            {
                var user = _context.User.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    return NotFound();
                }

                // Solo actualiza la contraseña si se proporciona una nueva
                if (!string.IsNullOrEmpty(updatedUser.Password))
                {
                    user.SetPassword(updatedUser.Password);
                }

                // Actualiza otros campos del usuario
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.Active = updatedUser.Active;
                user.Confirmed_At = updatedUser.Confirmed_At;
                user.Admin = updatedUser.Admin;
                user.Empleado = updatedUser.Empleado;
                user.Roles = updatedUser.Roles;

                _context.SaveChanges();
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
