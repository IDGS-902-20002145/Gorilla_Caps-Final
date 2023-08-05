# data_loader.py
import os
import pandas as pd
from sqlalchemy import create_engine

def load_data():
    # Configurar la conexión al motor de base de datos SQL Server
    engine = create_engine('sqlite:///datawerehouse_caps.db')

    # Cargar los datos transformados en las tablas del DataWarehouse
    
    user_df = pd.read_csv('data/user.csv')
    role_df = pd.read_csv('data/role.csv')
    roles_users_df = pd.read_csv('data/roles_users.csv')
    proveedor_df = pd.read_csv('data/proveedor.csv')
    producto_df = pd.read_csv('data/producto.csv')
    pedido_df = pd.read_csv('data/pedido.csv')
    detpedido_df = pd.read_csv('data/detpedido.csv')
    inventario_materia_prima_df = pd.read_csv('data/inventario_materia_prima.csv')
    detventa_df = pd.read_csv('data/detventa.csv')
    explotacion_material_df = pd.read_csv('data/explotacion_material.csv')
    compra_df = pd.read_csv('data/compra.csv')
    detcompra_df = pd.read_csv('data/detcompra.csv')
    venta_df = pd.read_csv('data/venta.csv')
    #cargar lo datos de la tabla ventas_mes_actual
    ventas_mes_actual_df = pd.read_csv('data/ventas_mes_actual.csv')
    clientes_activos_df = pd.read_csv('data/clientes_activos.csv')
    compras_mes_actual_df = pd.read_csv('data/compras_mes_actual.csv')
    productos_activos_df = pd.read_csv('data/productos_activos.csv')
    

    # Cargar los datos en las tablas del DataWarehouse
    user_df.to_sql('user', con=engine, if_exists='replace', index=False)
    role_df.to_sql('role', con=engine, if_exists='replace', index=False)
    roles_users_df.to_sql('roles_users', con=engine, if_exists='replace', index=False)
    proveedor_df.to_sql('proveedor', con=engine, if_exists='replace', index=False)
    producto_df.to_sql('producto', con=engine, if_exists='replace', index=False)
    pedido_df.to_sql('pedido', con=engine, if_exists='replace', index=False)
    detpedido_df.to_sql('detpedido', con=engine, if_exists='replace', index=False)
    inventario_materia_prima_df.to_sql('inventario_materia_prima', con=engine, if_exists='replace', index=False)
    detventa_df.to_sql('detventa', con=engine, if_exists='replace', index=False)
    explotacion_material_df.to_sql('explotacion_material', con=engine, if_exists='replace', index=False)
    compra_df.to_sql('compra', con=engine, if_exists='replace', index=False)
    detcompra_df.to_sql('detcompra', con=engine, if_exists='replace', index=False)
    venta_df.to_sql('venta', con=engine, if_exists='replace', index=False)
    #cargar los datos en las tablas del DataWarehouse
    ventas_mes_actual_df.to_sql('ventas_mes_actual', con=engine, if_exists='replace', index=False)
    clientes_activos_df.to_sql('clientes_activos', con=engine, if_exists='replace', index=False)
    compras_mes_actual_df.to_sql('compras_mes_actual', con=engine, if_exists='replace', index=False)
    productos_activos_df.to_sql('productos_activos', con=engine, if_exists='replace', index=False)
    
    

    # Eliminar los archivos CSV después de cargarlos
   
    os.remove('data/user.csv')
    os.remove('data/role.csv')
    os.remove('data/roles_users.csv')
    os.remove('data/proveedor.csv')
    os.remove('data/producto.csv')
    os.remove('data/pedido.csv')
    os.remove('data/detpedido.csv')
    os.remove('data/inventario_materia_prima.csv')
    os.remove('data/detventa.csv')
    os.remove('data/explotacion_material.csv')
    os.remove('data/compra.csv')
    os.remove('data/detcompra.csv')
    os.remove('data/venta.csv')
    #eliminar los archivos CSV despues de cargarlos
    os.remove('data/ventas_mes_actual.csv')
    os.remove('data/clientes_activos.csv')
    os.remove('data/compras_mes_actual.csv')
    os.remove('data/productos_activos.csv')
    
    

    print("Carga de datos completada.")
