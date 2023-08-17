using Gorrilla_Caps_Backend.Context;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Gorrilla_Caps_Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;

namespace Gorrilla_Caps_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;
        private IConfiguration config;

        public LoginController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            this.config = config;
        }

        [HttpGet("{id}", Name = "login")]
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
        [HttpPost("authenticate")]
        public IActionResult GetByEmailAndPassword(loginParams lp)
        {
            try
            {
                Console.WriteLine(lp.email+" "+lp.password);
                var user = _context.User.FirstOrDefault(u => u.Email == lp.email);
                Console.WriteLine(user.Name+""+user.Email+" "+user.Password);
                Console.WriteLine(user.VerifyPassword(lp.password));
                if (user.VerifyPassword(lp.password))
                {
                    // Regresamos el usuario junto con el token
                    return Ok(new { user, token = generateToken(user) });
                }

                return Unauthorized("Usuario o contraseña incorrectos.");
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("Registrar")]
        public IActionResult Post([FromBody] User user)
        {
            try
            {
                user.SetPassword(user.Password); // Almacena la contraseña como hash
                _context.User.Add(user);
                _context.SaveChanges();
                return CreatedAtRoute("GetUser", new { id = user.Id }, user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private string generateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("admin", user.Admin.ToString()),
                new Claim("empleado", user.Empleado.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("JWT:Key").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var securityToken = new JwtSecurityToken(
                               claims: claims,
                               expires: DateTime.Now.AddMinutes(60),
                               signingCredentials: creds);

            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }
    }
}
