USE gorilla_caps;

-- Consulta para generar el indicador de clientes Activos
SELECT COUNT(*) AS Clientes_Activos FROM [user] WHERE   active = 1  AND admin = 0 AND empleado = 0;


-- Consulta para calcular las compras segun las fechas 
SELECT YEAR(c.fecha) AS Anio, MONTH(c.fecha) AS Mes, SUM(d.Precio * d.Cantidad) AS Total_Compras
FROM Compra c
INNER JOIN DetCompra d ON c.id = d.compra_id
WHERE c.fecha >= '2023-05-01' AND c.fecha <= '2023-07-31' AND c.estatus = 1
GROUP BY YEAR(c.fecha), MONTH(c.fecha);



-- Consulta para tener un conteo de los productos activos y con stock en tienda
SELECT COUNT(*) AS Productos_Activos FROM Producto WHERE estatus = 1 AND stock_existencia > 0;


-- Consulta para obtener las ventas totales  segun las fechas 
SELECT YEAR(V.fecha) AS Anio, MONTH(V.fecha) AS Mes, SUM(D.Precio * D.Cantidad) AS Ventas_Totales
FROM VENTA V
INNER JOIN DetVenta D ON V.Id = D.VentaId
WHERE V.fecha >= '2023-05-01' AND V.fecha <= '2023-07-31' AND V.Estatus = 1
GROUP BY YEAR(V.fecha), MONTH(V.fecha);



-- Consulta para obtener el total de las ventas de cada producto desglosado por cada mes para crear la grafica
SELECT YEAR(v.Fecha) AS Anio,
       MONTH(v.Fecha) AS Mes,
       p.id AS ProductoId,
       p.nombre AS NombreProducto,
       SUM(dv.cantidad) AS TotalCantidad,
       SUM(dv.precio * dv.cantidad) AS TotalVenta
FROM Venta v
INNER JOIN DetVenta dv ON v.Id = dv.VentaId
INNER JOIN Producto p ON dv.ProductoId = p.id
WHERE v.Estatus = 1 AND v.Fecha BETWEEN '2023-05-01' AND '2023-07-31'
GROUP BY YEAR(v.Fecha), MONTH(v.Fecha), p.id, p.nombre
ORDER BY YEAR(v.Fecha), MONTH(v.Fecha), p.id;




-- Consulta  TOP 5 de clientes con la cantidad de compras que han hecho en el mes
SELECT TOP 5
    u.name AS NombreCliente,
    COUNT(v.Id) AS CantidadCompras
FROM
    [user] u
INNER JOIN
    Venta v ON u.Id = v.UserId
WHERE
    v.Fecha >= '2023-05-01' AND v.Fecha <= '2023-06-30'
GROUP BY
    u.id, u.name
ORDER BY
    CantidadCompras DESC;


-- Consultas para obtener las compras a cada provedoor desglosado por mes segun las fechas
SELECT
    p.id AS ProveedorId,
    p.nombre AS NombreProveedor,
    YEAR(c.fecha) AS Anio,
    MONTH(c.fecha) AS Mes,
    SUM(dc.cantidad * dc.precio) AS TotalCompra
FROM
    Proveedor p
INNER JOIN
    Compra c ON p.id = c.proveedor_id
INNER JOIN
    DetCompra dc ON c.id = dc.compra_id
WHERE
    c.fecha >= '2023-05-01' AND c.fecha <= '2023-07-31'
GROUP BY
    p.id, p.nombre, YEAR(c.fecha), MONTH(c.fecha)
ORDER BY
    p.id, YEAR(c.fecha), MONTH(c.fecha);


-- Consulta para obtener las ganancias por mes deslosado por mes/año
SELECT
    YEAR(Fecha) AS Anio,
    MONTH(Fecha) AS Mes,
    SUM(TotalVenta) - SUM(TotalCompra) AS Ganancia
FROM
    (
        SELECT
            v.Id AS VentaId,
            v.Fecha,
            SUM(dv.precio * dv.cantidad) AS TotalVenta,
            0 AS TotalCompra
        FROM
            Venta v
        INNER JOIN
            DetVenta dv ON v.Id = dv.VentaId
        WHERE
            v.Fecha >= '2023-05-01' AND v.Fecha <= '2023-06-30'
        GROUP BY
            v.Id, v.Fecha

        UNION ALL

        SELECT
            c.id AS VentaId,
            c.fecha,
            0 AS TotalVenta,
            SUM(dc.precio * dc.cantidad) AS TotalCompra
        FROM
            Compra c
        INNER JOIN
            DetCompra dc ON c.Id = dc.compra_id
        WHERE
            c.Fecha >= '2023-05-01' AND c.Fecha <= '2023-06-30'
        GROUP BY
            c.id, c.fecha
    ) AS Resultados
GROUP BY
    YEAR(Fecha), MONTH(Fecha)
ORDER BY
    YEAR(Fecha), MONTH(Fecha);
