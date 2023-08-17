USE gorilla_caps;

-- Creaci�n de la tabla 'user'
CREATE TABLE [user] (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BIT,
    confirmedAt DATETIME,
    admin BIT,
    empleado BIT
);

-- Creaci�n de la tabla 'role'
CREATE TABLE role (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

-- Creaci�n de la tabla 'roles_users'
CREATE TABLE roles_users (
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES [user](id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Creaci�n de la tabla 'Proveedor'
CREATE TABLE Proveedor (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    active BIT DEFAULT 1
);

-- Creaci�n de la tabla 'Producto'
CREATE TABLE Producto (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    color VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    precio DECIMAL(18, 2) NOT NULL,
    imagen VARCHAR(max) NOT NULL,
    stock_existencia INT NOT NULL,
    estatus BIT DEFAULT 1
);

-- Creaci�n de la tabla 'Pedido'
CREATE TABLE Pedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),
    estatus INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES [user](id)
);

-- Creaci�n de la tabla 'DetPedido'
CREATE TABLE DetPedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES Pedido(id),
    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);

-- Creaci�n de la tabla 'inventario_materia_prima'
CREATE TABLE inventarioMateriaPrima (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    cantidad FLOAT NOT NULL,
    stock_minimo FLOAT,
    estatus BIT DEFAULT 1
);

-- Creaci�n de la tabla 'Venta'
CREATE TABLE Venta (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL, -- Cambiado de User_Id a UserId
    Fecha DATE NOT NULL DEFAULT GETDATE(),
    Estatus BIT DEFAULT 0,
    FOREIGN KEY (UserId) REFERENCES [User](Id) -- Cambiado de User_Id a UserId
);

-- Creaci�n de la tabla 'DetVenta'
CREATE TABLE DetVenta (
    id INT PRIMARY KEY IDENTITY(1,1),
    VentaId INT NOT NULL,
    ProductoId INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (VentaId) REFERENCES Venta(Id),
    FOREIGN KEY (ProductoId) REFERENCES Producto(id)
);

-- Creaci�n de la tabla 'explotacion_material'
CREATE TABLE ExplotacionMaterial (
    id INT PRIMARY KEY IDENTITY(1,1),
    ProductoId INT NOT NULL,
    MaterialId INT NOT NULL,
    CantidadUsada FLOAT NOT NULL,
    cantidadIndividual FLOAT NOT NULL,
    FOREIGN KEY (ProductoId) REFERENCES Producto(id),
    FOREIGN KEY (MaterialId) REFERENCES inventarioMateriaPrima(id)
);

-- Creaci�n de la tabla 'Compra'
CREATE TABLE Compra (
    id INT PRIMARY KEY IDENTITY(1,1),
    proveedor_id INT NOT NULL,
    fecha DATE NOT NULL,
    estatus BIT DEFAULT 1,
    FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

-- Creaci�n de la tabla 'DetCompra'
CREATE TABLE DetCompra (
    id INT PRIMARY KEY IDENTITY(1,1),
    compra_id INT NOT NULL,
    material_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES Compra(Id),
    FOREIGN KEY (material_id) REFERENCES inventarioMateriaPrima(id)
);