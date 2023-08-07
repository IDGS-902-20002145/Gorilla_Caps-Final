# data_extractor.py
import pandas as pd
import pyodbc

def extract_data():
    # Configura la conexión al motor de base de datos SQL Server
    connection_string = 'DRIVER={SQL Server};SERVER=SERGIOALBA\\SQLEXPRESS;DATABASE=gorilla_caps;Trusted_Connection=yes;'
    connection = pyodbc.connect(connection_string)

    # Consulta para obtener los datos de la tabla 'user'
    user_query = "SELECT * FROM [user]"

    # Consulta para obtener los datos de la tabla 'role'
    role_query = "SELECT * FROM role"

    # Consulta para obtener los datos de la tabla 'roles_users'
    roles_users_query = "SELECT * FROM roles_users"

    # Consulta para obtener los datos de la tabla 'Proveedor'
    proveedor_query = "SELECT * FROM Proveedor"

    # Consulta para obtener los datos de la tabla 'Producto'
    producto_query = "SELECT * FROM Producto"

    # Consulta para obtener los datos de la tabla 'Pedido'
    pedido_query = "SELECT * FROM Pedido"

    # Consulta para obtener los datos de la tabla 'DetPedido'
    detpedido_query = "SELECT * FROM DetPedido"

    # Consulta para obtener los datos de la tabla 'inventario_materia_prima'
    inventario_materia_prima_query = "SELECT * FROM inventarioMateriaPrima"

    # Consulta para obtener los datos de la tabla 'Venta'
    venta_query = "SELECT * FROM Venta"

    # Consulta para obtener los datos de la tabla 'DetVenta'
    detventa_query = "SELECT * FROM DetVenta"

    # Consulta para obtener los datos de la tabla 'explotacion_material'
    explotacion_material_query = "SELECT * FROM ExplotacionMaterial"

    # Consulta para obtener los datos de la tabla 'Compra'
    compra_query = "SELECT * FROM Compra"

    # Consulta para obtener los datos de la tabla 'DetCompra'
    detcompra_query = "SELECT * FROM DetCompra"
    
    ventas_por_producto_query = f"SELECT p.nombre AS producto, v.fecha, SUM(dv.cantidad) AS cantidad " \
                                f"FROM Producto p " \
                                f"JOIN DetVenta dv ON p.id = dv.productoId " \
                                f"JOIN Venta v ON dv.ventaId = v.id " \
                                f"GROUP BY p.nombre, v.fecha"

    # Consulta para obtener los datos de clientes que más compraron por mes
    clientes_top_query = f"SELECT u.name AS cliente, v.fecha, SUM(dv.cantidad) AS cantidad " \
                         f"FROM [user] u " \
                         f"JOIN Venta v ON u.id = v.UserId " \
                         f"JOIN DetVenta dv ON v.id = dv.ventaId " \
                         f"GROUP BY u.name, v.fecha " \
                         f"ORDER BY SUM(dv.cantidad) DESC"

    # Consulta para obtener los datos de compras por proveedor
    compras_por_proveedor_query = f"SELECT pr.nombre AS proveedor, c.fecha, SUM(dc.cantidad) AS cantidad " \
                                  f"FROM Proveedor pr " \
                                  f"JOIN Compra c ON pr.id = c.proveedor_id " \
                                  f"JOIN DetCompra dc ON c.id = dc.compra_id " \
                                  f"GROUP BY pr.nombre, c.fecha"


    # Ejecutar las consultas y guardar los resultados en DataFrames
    user_df = pd.read_sql(user_query, connection)
    role_df = pd.read_sql(role_query, connection)
    roles_users_df = pd.read_sql(roles_users_query, connection)
    proveedor_df = pd.read_sql(proveedor_query, connection)
    producto_df = pd.read_sql(producto_query, connection)
    pedido_df = pd.read_sql(pedido_query, connection)
    detpedido_df = pd.read_sql(detpedido_query, connection)
    inventario_materia_prima_df = pd.read_sql(inventario_materia_prima_query, connection)
    venta_df = pd.read_sql(venta_query, connection)
    detventa_df = pd.read_sql(detventa_query, connection)
    explotacion_material_df = pd.read_sql(explotacion_material_query, connection)
    compra_df = pd.read_sql(compra_query, connection)
    detcompra_df = pd.read_sql(detcompra_query, connection)
     # Ejecutar las consultas y guardar los resultados en DataFrames
    ventas_mes_actual_df = pd.read_sql(ventas_por_producto_query, connection)
    clientes_activos_df = pd.read_sql(clientes_top_query, connection)
    compras_mes_actual_df = pd.read_sql(compras_por_proveedor_query, connection)
    productos_activos_df = pd.read_sql(producto_query, connection)
    # Cerrar la conexión a la base de datos
    connection.close()

    # Guardar los resultados en archivos CSV
    user_df.to_csv('data/user.csv', index=False)
    role_df.to_csv('data/role.csv', index=False)
    roles_users_df.to_csv('data/roles_users.csv', index=False)
    proveedor_df.to_csv('data/proveedor.csv', index=False)
    producto_df.to_csv('data/producto.csv', index=False)
    pedido_df.to_csv('data/pedido.csv', index=False)
    detpedido_df.to_csv('data/detpedido.csv', index=False)
    inventario_materia_prima_df.to_csv('data/inventario_materia_prima.csv', index=False)
    venta_df.to_csv('data/venta.csv', index=False)
    detventa_df.to_csv('data/detventa.csv', index=False)
    explotacion_material_df.to_csv('data/explotacion_material.csv', index=False)
    compra_df.to_csv('data/compra.csv', index=False)
    detcompra_df.to_csv('data/detcompra.csv', index=False)
     # Guardar los resultados en archivos CSV
    ventas_mes_actual_df.to_csv('data/ventas_mes_actual.csv', index=False)
    clientes_activos_df.to_csv('data/clientes_activos.csv', index=False)
    compras_mes_actual_df.to_csv('data/compras_mes_actual.csv', index=False)
    productos_activos_df.to_csv('data/productos_activos.csv', index=False)


    print("Extracción de datos completada.")
