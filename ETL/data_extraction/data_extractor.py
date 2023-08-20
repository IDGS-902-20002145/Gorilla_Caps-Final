import pandas as pd
import pyodbc

def extract_data(start_date, end_date):
    # Configura la conexión al motor de base de datos SQL Server
    connection_string = 'DRIVER={SQL Server};SERVER=SERGIOALBA\\SQLEXPRESS;DATABASE=gorilla_caps;'
    connection = pyodbc.connect(connection_string)
    


    # Consulta para obtener los datos de la tabla 'inventario_materia_prima'
    inventario_materia_prima_query = "SELECT * FROM inventarioMateriaPrima"
    
    clientes_activos_query = "SELECT COUNT(*) AS Clientes_Activos FROM [user] WHERE   active = 1  AND admin = 0 AND empleado = 0"
   
    compras_mes_actual_query = "SELECT YEAR(c.fecha) AS Anio, MONTH(c.fecha) AS Mes, SUM(d.Precio * d.Cantidad) AS Total_Compras\
                                FROM Compra c\
                                INNER JOIN DetCompra d ON c.id = d.compra_id\
                                WHERE c.fecha >= ? AND c.fecha <= ? AND c.estatus = 1\
                                GROUP BY YEAR(c.fecha), MONTH(c.fecha);"
    

    productos_activos_query = "SELECT COUNT(*) AS Productos_Activos FROM Producto WHERE estatus = 1 AND stock_existencia > 0"
    
    
    ventas_mes_actual_query = "SELECT YEAR(V.fecha) AS Anio, MONTH(V.fecha) AS Mes, SUM(D.Precio * D.Cantidad) AS Ventas_Totales\
                               FROM VENTA V\
                               INNER JOIN DetVenta D ON V.Id = D.VentaId\
                               WHERE V.fecha >= ? AND V.fecha <= ? AND V.Estatus = 1\
                               GROUP BY YEAR(V.fecha), MONTH(V.fecha);"
    
   
    ventas_producto_por_mes_query = "SELECT YEAR(v.Fecha) AS Anio, MONTH(v.Fecha) AS Mes, \
                                 p.id AS ProductoId, p.nombre AS NombreProducto, \
                                 SUM(dv.cantidad) AS TotalCantidad, \
                                 SUM(dv.precio * dv.cantidad) AS TotalVenta \
                           FROM Venta v \
                           INNER JOIN DetVenta dv ON v.Id = dv.VentaId \
                           INNER JOIN Producto p ON dv.ProductoId = p.id \
                           WHERE v.Estatus = 1 AND v.Fecha BETWEEN ? AND ? \
                           GROUP BY YEAR(v.Fecha), MONTH(v.Fecha), p.id, p.nombre \
                           ORDER BY YEAR(v.Fecha), MONTH(v.Fecha), p.id"
    
    
    top5_clientes_por_mes_query = "SELECT TOP 5 u.name AS NombreCliente, COUNT(v.Id) AS CantidadCompras FROM\
    [user] u INNER JOIN Venta v ON u.Id = v.UserId WHERE v.Fecha >= ? AND v.Fecha <= ?\
    GROUP BY u.id, u.name ORDER BY CantidadCompras DESC"
    

    utilidad_por_mes_query = "SELECT YEAR(Fecha) AS Anio, MONTH(Fecha) AS Mes, SUM(TotalVenta) - SUM(TotalCompra) AS Ganancia FROM\
    (SELECT v.Id AS VentaId,v.Fecha, SUM(dv.precio * dv.cantidad) AS TotalVenta,0 AS TotalCompra\
    FROM Venta v INNER JOIN DetVenta dv ON v.Id = dv.VentaId WHERE v.Fecha >= ? AND v.Fecha <= ?\
    GROUP BY v.Id, v.Fecha UNION ALL SELECT c.id AS VentaId,c.fecha,0 AS TotalVenta, SUM(dc.precio * dc.cantidad) AS TotalCompra\
    FROM Compra c INNER JOIN DetCompra dc ON c.Id = dc.compra_id WHERE c.Fecha >= ? AND c.Fecha <= ?\
    GROUP BY c.id, c.fecha) AS Resultados GROUP BY YEAR(Fecha), MONTH(Fecha) ORDER BY YEAR(Fecha), MONTH(Fecha)" 
    
    compras_por_proveedor_query = f"SELECT p.id AS ProveedorId, p.nombre AS NombreProveedor, YEAR(c.fecha) AS Anio,\
                                    MONTH(c.fecha) AS Mes, SUM(dc.cantidad * dc.precio) AS TotalCompra\
                                    FROM Proveedor p\
                                    INNER JOIN Compra c ON p.id = c.proveedor_id\
                                    INNER JOIN DetCompra dc ON c.id = dc.compra_id\
                                    WHERE c.fecha >= ? AND c.fecha <= ?\
                                    GROUP BY p.id, p.nombre, YEAR(c.fecha), MONTH(c.fecha)\
                                    ORDER BY p.id, YEAR(c.fecha), MONTH(c.fecha);"

    



    # Ejecutar las consultas y guardar los resultados en DataFrames
   
    inventario_materia_prima_df = pd.read_sql(inventario_materia_prima_query, connection)
    clientes_activos_df = pd.read_sql(clientes_activos_query, connection)
    compras_mes_actual_df = pd.read_sql(compras_mes_actual_query, connection, params=[start_date, end_date])
    productos_activos_df = pd.read_sql(productos_activos_query, connection)
    ventas_mes_actual_df = pd.read_sql(ventas_mes_actual_query, connection, params=[start_date, end_date])
    ventas_producto_por_mes_df = pd.read_sql(ventas_producto_por_mes_query, connection, params=[start_date, end_date])
    top5_clientes_por_mes_df = pd.read_sql(top5_clientes_por_mes_query, connection, params=[start_date, end_date])
    utilidad_por_mes_df = pd.read_sql(utilidad_por_mes_query, connection, params=[start_date, end_date, start_date, end_date])
    compras_por_proveedor_query = pd.read_sql(compras_por_proveedor_query, connection, params=[start_date, end_date])

    
    
    # Cerrar la conexión a la base de datos
    connection.close()

    # Guardar los resultados en archivos CSV
   
    inventario_materia_prima_df.to_csv('data/inventario_materia_prima.csv', index=False)
    clientes_activos_df.to_csv('data/clientes_activos.csv', index=False)
    compras_mes_actual_df.to_csv('data/compras_mes_actual.csv', index=False)
    productos_activos_df.to_csv('data/productos_activos.csv', index=False)
    ventas_mes_actual_df.to_csv('data/ventas_mes_actual.csv', index=False)
    ventas_producto_por_mes_df.to_csv('data/ventas_producto_por_mes.csv', index=False)
    top5_clientes_por_mes_df.to_csv('data/top5_clientes_por_mes.csv', index=False)
    utilidad_por_mes_df.to_csv('data/utilidad_por_mes.csv', index=False)
    compras_por_proveedor_query.to_csv('data/compras_por_proveedor.csv', index=False)
    
    


    print("Extracción de datos completada.")