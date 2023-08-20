using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace Gorrilla_Caps_Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // Hash de la contraseña
        public bool Active { get; set; }

        [Column("confirmedAt", TypeName = "datetime2")]
        public DateTime Confirmed_At { get; set; }
        public bool Admin { get; set; }
        public bool Empleado { get; set; }
        public List<Role>? Roles { get; set; }

        // Agregar un método para establecer la contraseña
        public void SetPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                Password = builder.ToString();
            }
        }

        // Agregar un método para verificar la contraseña
        public bool VerifyPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return Password == builder.ToString();
            }
        }
    }
}
