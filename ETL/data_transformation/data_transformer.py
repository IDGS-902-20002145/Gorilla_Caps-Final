# data_transformer.py
import pandas as pd

def transform_data():
    # Leer los datos de las tablas del DataLake
    inventario_materia_prima_df = pd.read_csv('data/inventario_materia_prima.csv')
    clientes_activos_df = pd.read_csv('data/clientes_activos.csv')
    compras_mes_actual_df = pd.read_csv('data/compras_mes_actual.csv')
    productos_activos_df = pd.read_csv('data/productos_activos.csv')
    ventas_mes_actual_df = pd.read_csv('data/ventas_mes_actual.csv')
    ventas_producto_por_mes_df = pd.read_csv('data/ventas_producto_por_mes.csv')
    top5_clientes_por_mes_df = pd.read_csv('data/top5_clientes_por_mes.csv')
    utilidad_por_mes_df = pd.read_csv('data/utilidad_por_mes.csv')
    compras_por_proveedor_df = pd.read_csv('data/compras_por_proveedor.csv')
    
    

    
    # Transformar los datos de la tabla 'inventario_materia_prima'
    inventario_materia_prima_df = inventario_materia_prima_df[['id','nombre','descripcion','cantidad','stock_minimo','estatus']]
    inventario_materia_prima_df.columns = ['id','nombre','descripcion','cantidad','stock_minimo','estatus']
    inventario_materia_prima_df.to_csv('data/inventario_materia_prima.csv', index=False)
    
    # Transformar los datos de la tabla 'clientes_activos'
    clientes_activos_df = clientes_activos_df[['Clientes_Activos']]
    clientes_activos_df.columns = ['Clientes_Activos']
    clientes_activos_df.to_csv('data/clientes_activos.csv', index=False)
    
    # Transformar los datos de la tabla 'compras_mes_actual'
    compras_mes_actual_df = compras_mes_actual_df[['Anio','Mes','Total_Compras']]
    compras_mes_actual_df.columns = ['Anio','Mes','Total_Compras']
    compras_mes_actual_df.to_csv('data/compras_mes_actual.csv', index=False)
    
    # Transformar los datos de la tabla 'productos_activos'
    productos_activos_df = productos_activos_df[['Productos_Activos']]
    productos_activos_df.columns = ['Productos_Activos']
    productos_activos_df.to_csv('data/productos_activos.csv', index=False)
    
    # Transformar los datos de la tabla 'ventas_mes_actual'
    ventas_mes_actual_df = ventas_mes_actual_df[['Anio','Mes','Ventas_Totales']]
    ventas_mes_actual_df.columns = ['Anio','Mes','Ventas_Totales']
    ventas_mes_actual_df.to_csv('data/ventas_mes_actual.csv', index=False)
    
    # Transformar los datos de la tabla 'ventas_producto_por_mes'
    ventas_producto_por_mes_df = ventas_producto_por_mes_df[['Anio','Mes','ProductoId','NombreProducto','TotalCantidad','TotalVenta']]
    ventas_producto_por_mes_df.columns = ['Anio','Mes','ProductoId','NombreProducto','TotalCantidad','TotalVenta']
    ventas_producto_por_mes_df.to_csv('data/ventas_producto_por_mes.csv', index=False)
    
    # Transformar los datos de la tabla 'top5_clientes_por_mes'
    top5_clientes_por_mes_df = top5_clientes_por_mes_df[['NombreCliente','CantidadCompras']]
    top5_clientes_por_mes_df.columns = ['NombreCliente','CantidadCompras']
    top5_clientes_por_mes_df.to_csv('data/top5_clientes_por_mes.csv', index=False)
    
    # Transformar los datos de la tabla 'utilidad_por_mes'
    utilidad_por_mes_df = utilidad_por_mes_df[['Anio','Mes','Ganancia']]
    utilidad_por_mes_df.columns = ['Anio','Mes','Ganancia']
    utilidad_por_mes_df.to_csv('data/utilidad_por_mes.csv', index=False)
    
    # Transformar los datos de la tabla 'compras_por_proveedor'
    compras_por_proveedor_df = compras_por_proveedor_df[['ProveedorId','NombreProveedor','Anio','Mes','TotalCompra']]
    compras_por_proveedor_df.columns = ['ProveedorId','NombreProveedor','Anio','Mes','TotalCompra']
    compras_por_proveedor_df.to_csv('data/compras_por_proveedor.csv', index=False)
    
    

    print("Transformación de datos completada.")