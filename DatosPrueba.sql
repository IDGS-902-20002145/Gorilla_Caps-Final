USE gorilla_caps;

-- Inserts de prueba para usuario

INSERT INTO [user] (name, email, password, active, confirmedAt, admin, empleado)
VALUES ('Juan Perez', 'juan@example.com', '123456', 1, GETDATE(), 1, 0);

INSERT INTO [user] (name, email, password, active, confirmedAt, admin, empleado)
VALUES ('Mar�a L�pez', 'maria@example.com', 'abcdef', 1, GETDATE(), 0, 1);

INSERT INTO [user] (name, email, password, active, confirmedAt, admin, empleado)
VALUES ('Pedro Gomez', 'pedro@example.com', 'qwerty', 1, GETDATE(), 0, 0);



-- Inserts de prueba para rol

INSERT INTO role (name, description)
VALUES ('Administrador', 'Rol de administrador con todos los privilegios.');

INSERT INTO role (name, description)
VALUES ('Usuario', 'Rol de usuario b�sico.');

INSERT INTO role (name, description)
VALUES ('Empleado', 'Rol de empleado con permisos espec�ficos.');


-- Inserts de prueba para rol_usuario

INSERT INTO roles_users (user_id, role_id)
VALUES (1, 1);

INSERT INTO roles_users (user_id, role_id)
VALUES (2, 2);

INSERT INTO roles_users (user_id, role_id)
VALUES (3, 2);


INSERT INTO proveedor (nombre, email, telefono, direccion, active)
VALUES ('Proveedor A', 'proveedorA@example.com', '1234567890', 'Direcci�n 1', 1);

INSERT INTO proveedor (nombre, email, telefono, direccion, active)
VALUES ('Proveedor B', 'proveedorB@example.com', '9876543210', 'Direcci�n 2', 1);

INSERT INTO proveedor (nombre, email, telefono, direccion, active)
VALUES ('Proveedor C', 'proveedorC@example.com', '5555555555', 'Direcci�n 3', 1);


INSERT INTO producto (nombre, descripcion, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto A', 'Descripci�n del producto A', 'Azul', 'Modelo A', 9.99, 'imagenA.jpg', 100, 1);

INSERT INTO producto (nombre, descripcion, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto B', 'Descripci�n del producto B', 'Rojo', 'Modelo B', 14.99, 'imagenB.jpg', 50, 1);

INSERT INTO producto (nombre, descripcion, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto C', 'Descripci�n del producto C', 'Verde', 'Modelo C', 19.99, 'imagenC.jpg', 75, 1);

INSERT INTO producto (nombre, descripcion, color, modelo, precio, imagen, stock_existencia, estatus)
VALUES ('Producto D', 'Descripci�n del producto D', 'Blanco', 'Modelo D', 19.99, 'imagenD.jpg', 25, 1);



INSERT INTO pedido (user_id, estatus)
VALUES (1, 1);

INSERT INTO pedido (user_id, estatus)
VALUES (2, 0);

INSERT INTO pedido (user_id, estatus)
VALUES (3, 1);


-- Ejemplo 1
INSERT INTO detPedido (pedido_id, producto_id, cantidad)
VALUES (1, 1, 5);

-- Ejemplo 2
INSERT INTO detPedido (pedido_id, producto_id, cantidad)
VALUES (1, 2, 3);

-- Ejemplo 3
INSERT INTO detPedido (pedido_id, producto_id, cantidad)
VALUES (2, 3, 2);


INSERT INTO inventarioMateriaPrima (nombre, descripcion, cantidad, stock_minimo, estatus)
VALUES ('Materia Prima 1', 'Descripci�n de la materia prima 1', 100.5, 50.2, 1);

INSERT INTO inventarioMateriaPrima (nombre, descripcion, cantidad, stock_minimo, estatus)
VALUES ('Materia Prima 2', 'Descripci�n de la materia prima 2', 150.2, 75.5, 1);

INSERT INTO inventarioMateriaPrima (nombre, descripcion, cantidad, stock_minimo, estatus)
VALUES ('Materia Prima 3', 'Descripci�n de la materia prima 3', 200.0, 100.0, 1);


INSERT INTO venta (UserId, fecha, estatus)
VALUES (1, GETDATE(), 0);

INSERT INTO venta (UserId, fecha, estatus)
VALUES (2, GETDATE(), 0);

INSERT INTO venta (UserId, fecha, estatus)
VALUES (1, GETDATE(), 1);

INSERT INTO venta (UserId, fecha, estatus)
VALUES (3, GETDATE(), 0);

INSERT INTO venta (UserId, fecha, estatus)
VALUES (3, GETDATE(), 1);


INSERT INTO detVenta (VentaId, ProductoId, cantidad, precio)
VALUES (1, 1, 5, 10.99);

INSERT INTO detVenta (VentaId, ProductoId, cantidad, precio)
VALUES (1, 2, 3, 15.99);

INSERT INTO detVenta (VentaId, ProductoId, cantidad, precio)
VALUES (3, 2, 3, 15.99);

INSERT INTO detVenta (VentaId, ProductoId, cantidad, precio)
VALUES (2, 3, 2, 20.5);

INSERT INTO detVenta (VentaId, ProductoId, cantidad, precio)
VALUES (4, 2, 3, 15.99);

INSERT INTO detVenta (VentaId, ProductoId, cantidad, precio)
VALUES (3, 2, 6, 23.20);


INSERT INTO explotacionMaterial (ProductoId, MaterialId, cantidadUsada, cantidadIndividual)
VALUES (1, 1, 10.5, 2.5);

INSERT INTO explotacionMaterial (ProductoId, MaterialId, cantidadUsada, cantidadIndividual)
VALUES (2, 3, 5.2, 1.8);

INSERT INTO explotacionMaterial (ProductoId, MaterialId, cantidadUsada, cantidadIndividual)
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
