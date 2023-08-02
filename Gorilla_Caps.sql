USE gorilla_caps;

-- Creación de la tabla 'user'
CREATE TABLE [user] (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BIT,
    confirmed_at DATETIME,
    admin BIT,
    empleado BIT
);

-- Creación de la tabla 'role'
CREATE TABLE role (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

-- Creación de la tabla 'roles_users'
CREATE TABLE roles_users (
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES [user](id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Creación de la tabla 'Proveedor'
CREATE TABLE Proveedor (
    id INT PRIMARY KEY IDENTITY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    active BIT DEFAULT 1
);

-- Creación de la tabla 'Producto'
CREATE TABLE Producto (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    talla VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    precio FLOAT NOT NULL,
    imagen VARCHAR(250) NOT NULL,
    stock_existencia INT NOT NULL,
    estatus BIT DEFAULT 1
);

-- Creación de la tabla 'Pedido'
CREATE TABLE Pedido (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),
    estatus VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES [user](id)
);

-- Creación de la tabla 'DetPedido'
CREATE TABLE DetPedido (
    id INT PRIMARY KEY IDENTITY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES Pedido(id),
    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);

-- Creación de la tabla 'inventario_materia_prima'
CREATE TABLE inventario_materia_prima (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    cantidad FLOAT NOT NULL,
    stock_minimo FLOAT,
    estatus BIT DEFAULT 1
);

-- Creación de la tabla 'Venta'
CREATE TABLE Venta (
    id INT PRIMARY KEY IDENTITY,
    user_id INT NOT NULL,
    fecha DATE NOT NULL DEFAULT GETDATE(),
    estatus BIT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES [user](id)
);

-- Creación de la tabla 'DetVenta'
CREATE TABLE DetVenta (
    id INT PRIMARY KEY IDENTITY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Venta(id),
    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);

-- Creación de la tabla 'explotacion_material'
CREATE TABLE explotacion_material (
    id INT PRIMARY KEY IDENTITY,
    producto_id INT NOT NULL,
    material_id INT NOT NULL,
    cantidad_usada FLOAT NOT NULL,
    cantidadIndividual FLOAT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES Producto(id),
    FOREIGN KEY (material_id) REFERENCES inventario_materia_prima(id)
);

-- Creación de la tabla 'Compra'
CREATE TABLE Compra (
    id INT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    fecha DATE NOT NULL,
    estatus BIT DEFAULT 1,
    FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

-- Creación de la tabla 'DetCompra'
CREATE TABLE DetCompra (
    id INT PRIMARY KEY,
    compra_id INT NOT NULL,
    material_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES Compra(id),
    FOREIGN KEY (material_id) REFERENCES inventario_materia_prima(id)
);
