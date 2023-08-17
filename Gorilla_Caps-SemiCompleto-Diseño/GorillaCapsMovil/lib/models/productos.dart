class Producto{
   int id;
   String nombre;
   String descripcion;
   String color;
   String modelo;
   double precio;
   String imagen;
   int stockExistencia;
   bool estatus;

  Producto({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.color,
    required this.modelo,
    required this.precio,
    required this.imagen,
    required this.stockExistencia,
    required this.estatus,
  });

  factory Producto.fromJson(Map<String, dynamic> json) {
    return Producto(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'],
      color: json['color'],
      modelo: json['modelo'],
      precio: json['precio'].toDouble(),
      imagen: json['imagen'],
      stockExistencia: json['stock_existencia'],
      estatus: json['estatus'],
    );
  }
}