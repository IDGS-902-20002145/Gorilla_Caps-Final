USE gorilla_caps;

-- Inserts de prueba para usuario

INSERT INTO usuario (name, email, password, active, confirmed_at, admin, empleado)
VALUES ('Juan Perez', 'juan@example.com', '123456', 1, GETDATE(), 1, 0);

INSERT INTO usuario (name, email, password, active, confirmed_at, admin, empleado)
VALUES ('María López', 'maria@example.com', 'abcdef', 1, GETDATE(), 0, 1);

INSERT INTO usuario (name, email, password, active, confirmed_at, admin, empleado)
VALUES ('Pedro Gomez', 'pedro@example.com', 'qwerty', 1, GETDATE(), 0, 0);



-- Inserts de prueba para rol

INSERT INTO rol (name, description)
VALUES ('Administrador', 'Rol de administrador con todos los privilegios.');

INSERT INTO rol (name, description)
VALUES ('Usuario', 'Rol de usuario básico.');

INSERT INTO rol (name, description)
VALUES ('Empleado', 'Rol de empleado con permisos específicos.');


-- Inserts de prueba para rol_usuario

INSERT INTO rol_usuario (user_id, role_id)
VALUES (1, 1);

INSERT INTO rol_usuario (user_id, role_id)
VALUES (2, 2);

INSERT INTO rol_usuario (user_id, role_id)
VALUES (3, 2);


INSERT INTO proveedor (nombre, email, telefono, direccion, active)
VALUES ('Proveedor A', 'proveedorA@example.com', '1234567890', 'Dirección 1', 1);

INSERT INTO proveedor (nombre, email, telefono, direccion, active)
VALUES ('Proveedor B', 'proveedorB@example.com', '9876543210', 'Dirección 2', 1);

INSERT INTO proveedor (nombre, email, telefono, direccion, active)
VALUES ('Proveedor C', 'proveedorC@example.com', '5555555555', 'Dirección 3', 1);


INSERT INTO producto (nombre, descripcion, talla, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto A', 'Descripción del producto A', 'XL', 'Azul', 'Modelo A', 9.99, 'imagenA.jpg', 100, 1);

INSERT INTO producto (nombre, descripcion, talla, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto B', 'Descripción del producto B', 'M', 'Rojo', 'Modelo B', 14.99, 'imagenB.jpg', 50, 1);

INSERT INTO producto (nombre, descripcion, talla, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto C', 'Descripción del producto C', 'L', 'Verde', 'Modelo C', 19.99, 'imagenC.jpg', 75, 1);


INSERT INTO pedido (user_id, estatus)
VALUES (1, 'En proceso');

INSERT INTO pedido (user_id, estatus)
VALUES (2, 'Pendiente');

INSERT INTO pedido (user_id, estatus)
VALUES (3, 'Completado');


-- Ejemplo 1
INSERT INTO detPedido (pedido_id, producto_id, cantidad)
VALUES (1, 1, 5);

-- Ejemplo 2
INSERT INTO detPedido (pedido_id, producto_id, cantidad)
VALUES (1, 2, 3);

-- Ejemplo 3
INSERT INTO detPedido (pedido_id, producto_id, cantidad)
VALUES (2, 3, 2);


INSERT INTO inventario_materia_prima (nombre, descripcion, cantidad, stock_minimo, estatus)
VALUES ('Materia Prima 1', 'Descripción de la materia prima 1', 100.5, 50.2, 1);

INSERT INTO inventario_materia_prima (nombre, descripcion, cantidad, stock_minimo, estatus)
VALUES ('Materia Prima 2', 'Descripción de la materia prima 2', 150.2, 75.5, 1);

INSERT INTO inventario_materia_prima (nombre, descripcion, cantidad, stock_minimo, estatus)
VALUES ('Materia Prima 3', 'Descripción de la materia prima 3', 200.0, 100.0, 1);


INSERT INTO venta (user_id, fecha, estatus)
VALUES (1, GETDATE(), 0);

INSERT INTO venta (user_id, fecha, estatus)
VALUES (2, GETDATE(), 0);

INSERT INTO venta (user_id, fecha, estatus)
VALUES (1, GETDATE(), 1);


INSERT INTO detVenta (venta_id, producto_id, cantidad, precio)
VALUES (1, 1, 5, 10.99);

INSERT INTO detVenta (venta_id, producto_id, cantidad, precio)
VALUES (1, 2, 3, 15.99);

INSERT INTO detVenta (venta_id, producto_id, cantidad, precio)
VALUES (2, 3, 2, 20.5);


INSERT INTO explotacion_material (producto_id, material_id, cantidad_usada, cantidadIndividual)
VALUES (1, 1, 10.5, 2.5);

INSERT INTO explotacion_material (producto_id, material_id, cantidad_usada, cantidadIndividual)
VALUES (2, 3, 5.2, 1.8);

INSERT INTO explotacion_material (producto_id, material_id, cantidad_usada, cantidadIndividual)
VALUES (3, 2, 8.7, 3.3);


INSERT INTO compra (proveedor_id, fecha, estatus)
VALUES (1, '2023-07-01', 1);

INSERT INTO compra (proveedor_id, fecha, estatus)
VALUES (2, '2023-07-05', 1);

INSERT INTO compra (proveedor_id, fecha, estatus)
VALUES (3, '2023-07-10', 1);


INSERT INTO detCompra (compra_id, material_id, cantidad, precio)
VALUES (1, 1, 100, 10.5);

INSERT INTO detCompra (compra_id, material_id, cantidad, precio)
VALUES (1, 2, 50, 8.75);

INSERT INTO detCompra (compra_id, material_id, cantidad, precio)
VALUES (2, 3, 75, 5.25);

