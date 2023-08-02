using Microsoft.EntityFrameworkCore;

namespace Gorrilla_Caps_Backend.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Models.Compra> Compra { get; set; }
        public DbSet<Models.DetCompra> DetCompra { get; set; }
        public DbSet<Models.Pedido> Pedido { get; set; }
        public DbSet<Models.DetPedido> DetPedido { get; set; }
        public DbSet<Models.Producto> Producto { get; set; }
        public DbSet<Models.User> User { get; set; }
        public DbSet<Models.Role> Roles { get; set; }
        public DbSet<Models.RolesUsers> UserRoles { get; set; }
        public DbSet<Models.Venta> Venta { get; set; }
        public DbSet<Models.DetVenta> DetVenta { get; set; }
        public DbSet<Models.Proveedor> Proveedor { get; set; }
        public DbSet<Models.InventarioMateriaPrima> InventarioMateriaPrima { get; set; }
        public DbSet<Models.explotacion_material> ExplotacionMaterial { get; set; }


    }
          

}
