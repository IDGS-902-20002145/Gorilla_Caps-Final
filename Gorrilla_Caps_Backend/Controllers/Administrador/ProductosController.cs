using Microsoft.AspNetCore.Mvc;
using Gorrilla_Caps_Backend.Models;
using System.Linq;
using Gorrilla_Caps_Backend.Context;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using System.Net.NetworkInformation;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Gorrilla_Caps_Backend.Controllers.Administrador
{
    //Nota, vamos a tener que poner [Authorize(Policy = "Empleado")] a todas las rutas menos a la de mostrar-todos, ya que se necesita para el catalogo
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize(Policy = "Empleado")]
        [HttpPost]
        public IActionResult AgregarProducto([FromBody] Producto producto)
        {
            try
            {
                // Validar que se haya proporcionado al menos un material
                if (producto.explotacion_material == null || producto.explotacion_material.Count == 0)
                {
                    return BadRequest("Debe proporcionar al menos un material para crear el producto.");
                }

                // Validar que todos los materiales existan en el inventario y no estén en su stock mínimo
                foreach (var explotacionMaterial in producto.explotacion_material)
                {
                    var material = _context.InventarioMateriaPrima.Find(explotacionMaterial.MaterialId);
                    if (material == null)
                    {
                        return BadRequest($"El material con el ID {explotacionMaterial.MaterialId} no existe en el inventario.");
                    }

                    if (material.Cantidad <= material.Stock_Minimo)
                    {
                        return BadRequest($"El material {material.Nombre} se encuentra en su stock mínimo y no se puede utilizar para crear el producto.");
                    }

                    if (explotacionMaterial.CantidadIndividual < 0)
                    {
                        return BadRequest($"La cantidad individual del material con el ID {explotacionMaterial.MaterialId} no puede ser menor a cero.");
                    }

                    // Calcular la cantidad usada para este material
                    explotacionMaterial.CantidadUsada = explotacionMaterial.CantidadIndividual * producto.stock_existencia;
                }

                // Crear una nueva instancia de Producto con los datos proporcionados
                var nuevoProducto = new Producto
                {
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Color = producto.Color,
                    Modelo = producto.Modelo,
                    Precio = producto.Precio,
                    Imagen = producto.Imagen,
                    stock_existencia = producto.stock_existencia,
                    Estatus = producto.Estatus
                };

                // Agregar el nuevo producto a la base de datos
                _context.Producto.Add(nuevoProducto);
                _context.SaveChanges();

                // Crear las instancias de ExplotacionMaterial asociadas al producto
                foreach (var explotacionMaterial in producto.explotacion_material)
                {
                    explotacionMaterial.ProductoId = nuevoProducto.Id;

                    // Agregar el nuevo ExplotacionMaterial a la base de datos
                    _context.ExplotacionMaterial.Add(explotacionMaterial);
                    _context.SaveChanges();

                    // Actualizar el inventario de materias primas
                    var material = _context.InventarioMateriaPrima.Find(explotacionMaterial.MaterialId);
                    if (material != null)
                    {
                        material.Cantidad -= explotacionMaterial.CantidadUsada;
                        _context.InventarioMateriaPrima.Update(material);
                        _context.SaveChanges();
                    }
                }

                if (!string.IsNullOrEmpty(producto.Imagen))
                {
                    producto.Imagen = "data:image/png;base64," + producto.Imagen;
                }

                return Ok(nuevoProducto);
            }
            catch (DbUpdateException ex)
            {
                // Capturar la excepción interna y proporcionar más detalles
                return StatusCode(500, "Error al agregar el producto: " + ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al agregar el producto: " + ex.Message);
            }
        }
        [HttpPatch("{id}/actualizar-stock")]
        public IActionResult ActualizarStock(int id, [FromBody] int nuevoStock)
        {
            try
            {
                // Buscar el producto por su ID en la base de datos
                var producto = _context.Producto.Include(p => p.explotacion_material).FirstOrDefault(p => p.Id == id);
                if (producto == null)
                {
                    return NotFound("No se encontró el producto.");
                }

                // Verificar si la diferencia de stock es mayor a cero (se está agregando stock)
                if (nuevoStock > 0)
                {
                    // Se está agregando stock, por lo tanto, se debe descontar el material necesario del inventario
                    foreach (var explotacionMaterial in producto.explotacion_material)
                    {
                        var material = _context.InventarioMateriaPrima.Find(explotacionMaterial.MaterialId);
                        if (material == null)
                        {
                            return BadRequest($"El material con el ID {explotacionMaterial.MaterialId} no existe en el inventario.");
                        }

                        var cantidadNecesaria = explotacionMaterial.CantidadIndividual * nuevoStock;
                        if (material.Cantidad < cantidadNecesaria)
                        {
                            return BadRequest($"No hay suficiente cantidad de {material.Nombre} en el inventario para agregar el stock solicitado.");
                        }

                        // Actualizar el inventario de materias primas restando la cantidad necesaria
                        material.Cantidad -= cantidadNecesaria;
                        _context.InventarioMateriaPrima.Update(material);
                    }

                    // Crear una nueva instancia de ExplotacionMaterial para cada material y agregarla a una lista
                    List<explotacion_material> nuevosExplotacionMaterial = new List<explotacion_material>();
                    foreach (var explotacionMaterial in producto.explotacion_material)
                    {
                        var cantidadTotal = explotacionMaterial.CantidadIndividual * nuevoStock;

                        explotacion_material nuevoExplotacionMaterial = new explotacion_material
                        {
                            ProductoId = producto.Id,
                            MaterialId = explotacionMaterial.MaterialId,
                            CantidadUsada = cantidadTotal,
                            CantidadIndividual = explotacionMaterial.CantidadIndividual
                        };

                        nuevosExplotacionMaterial.Add(nuevoExplotacionMaterial);
                    }

                    // Agregar todas las nuevas instancias de ExplotacionMaterial a la base de datos
                    _context.ExplotacionMaterial.AddRange(nuevosExplotacionMaterial);
                }

                // Incrementar el stock del producto en la base de datos
                producto.stock_existencia += nuevoStock;
                _context.Producto.Update(producto);
                _context.SaveChanges();

                return Ok(producto);
            }
            catch (DbUpdateException ex)
            {
                // Capturar la excepción interna y proporcionar más detalles
                return StatusCode(500, "Error al actualizar el stock del producto: " + ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al actualizar el stock del producto: " + ex.Message);
            }
        }

        // Método para actualizar el producto
        [HttpPut("{id}")]
        public IActionResult ActualizarProducto(int id, [FromBody] Producto producto)
        {
            try
            {
                // Buscar el producto por su ID en la base de datos
                var productoActual = _context.Producto.Find(id);
                if (productoActual == null)
                {
                    return NotFound("No se encontró el producto.");
                }

                // Actualizar los datos del producto que se proporcionaron en el JSON
                if (!string.IsNullOrEmpty(producto.Nombre))
                {
                    productoActual.Nombre = producto.Nombre;
                }

                if (!string.IsNullOrEmpty(producto.Descripcion))
                {
                    productoActual.Descripcion = producto.Descripcion;
                }

                if (!string.IsNullOrEmpty(producto.Color))
                {
                    productoActual.Color = producto.Color;
                }



                if (!string.IsNullOrEmpty(producto.Modelo))
                {
                    productoActual.Modelo = producto.Modelo;
                }

                // Actualizar la imagen solo si se proporcionó en el JSON
                if (!string.IsNullOrEmpty(producto.Imagen))
                {
                    productoActual.Imagen = "" + producto.Imagen;
                }

                // Actualizar el producto en la base de datos
                _context.Producto.Update(productoActual);
                _context.SaveChanges();

                return Ok(productoActual);
            }
            catch (DbUpdateException ex)
            {
                // Capturar la excepción interna y proporcionar más detalles
                return StatusCode(500, "Error al actualizar el producto: " + ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al actualizar el producto: " + ex.Message);
            }
        }

        //Metodo para eliminar un producto de forma logica
        [HttpDelete("{id}")]
        public IActionResult EliminarProducto(int id)
        {
            try
            {
                // Buscar el producto por su ID en la base de datos
                var producto = _context.Producto.Find(id);
                if (producto == null)
                {
                    return NotFound("No se encontró el producto.");
                }

                // Cambiar el estado del producto a inactivo (Estatus = 0)
                producto.Estatus = false; // Cambiar a inactivo
                _context.Producto.Update(producto);
                _context.SaveChanges();

                return Ok(producto);
            }
            catch (DbUpdateException ex)
            {
                // Capturar la excepción interna y proporcionar más detalles
                return StatusCode(500, "Error al eliminar el producto: " + ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al eliminar el producto: " + ex.Message);
            }
        }

        //[HttpGet("mostrar-productos")]
        //public IActionResult MostrarProductos()
        //{
        //    try
        //    {
        //        // Obtener todos los productos activos (Estatus = 1) de la base de datos
        //        var productos = _context.Producto.Where(p => p.Estatus == true).ToList();

        //        return Ok(productos);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Error al obtener los productos: " + ex.Message);
        //    }
        //}
        ////metodo para obtener los productos por id
        //[HttpGet("{id}")]
        //public IActionResult ObtenerProducto(int id)
        //{
        //    try
        //    {
        //        // Buscar el producto por su ID en la base de datos
        //        var producto = _context.Producto.Find(id);
        //        if (producto == null)
        //        {
        //            return NotFound("No se encontró el producto.");
        //        }

        //        return Ok(producto);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Error al obtener el producto: " + ex.Message);
        //    }
        //}



    }
}