# data_transformer.py
import pandas as pd

def transform_data():
    # Leer los datos de las tablas del DataLake
    user_df = pd.read_csv('data/user.csv')
    role_df = pd.read_csv('data/role.csv')
    roles_users_df = pd.read_csv('data/roles_users.csv')
    proveedor_df = pd.read_csv('data/proveedor.csv')
    producto_df = pd.read_csv('data/producto.csv')
    pedido_df = pd.read_csv('data/pedido.csv')
    detpedido_df = pd.read_csv('data/detpedido.csv')
    inventario_materia_prima_df = pd.read_csv('data/inventario_materia_prima.csv')
    venta_df = pd.read_csv('data/venta.csv')
    detventa_df = pd.read_csv('data/detventa.csv')
    explotacion_material_df = pd.read_csv('data/explotacion_material.csv')
    compra_df = pd.read_csv('data/compra.csv')
    detcompra_df = pd.read_csv('data/detcompra.csv')
    #leer los datos de las tablas del DataLake
    ventas_mes_actual_df = pd.read_csv('data/ventas_mes_actual.csv')
    clientes_activos_df = pd.read_csv('data/clientes_activos.csv')
    compras_mes_actual_df = pd.read_csv('data/compras_mes_actual.csv')
    productos_activos_df = pd.read_csv('data/productos_activos.csv')
    

    # Transformar los datos de la tabla 'user'
    user_df = user_df[['id','name','email','password','active','confirmedAt','admin','empleado']]
    user_df.columns = ['id','name','email','password','active','confirmedAt','admin','empleado']
    user_df.to_csv('data/user.csv', index=False)

    # Transformar los datos de la tabla 'role'
    role_df = role_df[['id', 'name', 'description']]
    role_df.columns = ['id', 'name', 'description']
    role_df.to_csv('data/role.csv', index=False)

    # Transformar los datos de la tabla 'roles_users'
    roles_users_df = roles_users_df[['user_id', 'role_id']]
    roles_users_df.columns = ['user_id', 'role_id']
    roles_users_df.to_csv('data/roles_users.csv', index=False)
    
    # Transformar los datos de la tabla 'proveedor'
    proveedor_df = proveedor_df[['id', 'nombre', 'direccion', 'telefono', 'email']]
    proveedor_df.columns = ['id', 'nombre', 'direccion', 'telefono', 'email']
    proveedor_df.to_csv('data/proveedor.csv', index=False)
    
    # Transformar los datos de la tabla 'producto'
    producto_df = producto_df[['id','nombre','descripcion','color','modelo','precio','stock_existencia','estatus','imagen']]
    producto_df.columns = ['id','nombre','descripcion','color','modelo','precio','stock_existencia','estatus','imagen']
    producto_df.to_csv('data/producto.csv', index=False)
    
    # Transformar los datos de la tabla 'pedido'
    pedido_df = pedido_df[['id','user_id','fecha','estatus']]
    pedido_df.columns = ['id','user_id','fecha','estatus']
    pedido_df.to_csv('data/pedido.csv', index=False)
    
    # Transformar los datos de la tabla 'detpedido'
    detpedido_df = detpedido_df[['id','pedido_id','producto_id','cantidad']]
    detpedido_df.columns = ['id','pedido_id','producto_id','cantidad']
    detpedido_df.to_csv('data/detpedido.csv', index=False)
    
    # Transformar los datos de la tabla 'inventario_materia_prima'
    inventario_materia_prima_df = inventario_materia_prima_df[['id','nombre','descripcion','cantidad','stock_minimo','estatus']]
    inventario_materia_prima_df.columns = ['id','nombre','descripcion','cantidad','stock_minimo','estatus']
    inventario_materia_prima_df.to_csv('data/inventario_materia_prima.csv', index=False)
    
    # Transformar los datos de la tabla 'venta'
    venta_df = venta_df[['Id','UserId','Fecha','Estatus']]
    venta_df.columns = ['Id','UserId','Fecha','Estatus']
    venta_df.to_csv('data/venta.csv', index=False)
    
    # Transformar los datos de la tabla 'detventa'
    detventa_df = detventa_df[['id','VentaId','ProductoId','cantidad','precio']]
    detventa_df.columns = ['id','VentaId','ProductoId','cantidad','precio']
    detventa_df.to_csv('data/detventa.csv', index=False)
    
    # Transformar los datos de la tabla 'explotacion_material'
    explotacion_material_df = explotacion_material_df[['id','ProductoId','MaterialId','CantidadUsada','cantidadIndividual']]
    explotacion_material_df.columns = ['id','ProductoId','MaterialId','CantidadUsada','cantidadIndividual']
    explotacion_material_df.to_csv('data/explotacion_material.csv', index=False)

    # Transformar los datos de la tabla 'compra'
    compra_df = compra_df[['id','proveedor_id','fecha','estatus']]
    compra_df.columns = ['id','proveedor_id','fecha','estatus']
    compra_df.to_csv('data/compra.csv', index=False)
    
    # Transformar los datos de la tabla 'detcompra'
    detcompra_df = detcompra_df[['id','compra_id','material_id','cantidad','precio']]
    detcompra_df.columns = ['id','compra_id','material_id','cantidad','precio']
    detcompra_df.to_csv('data/detcompra.csv', index=False)
    
    #transformar los datos de la tabla 'ventas_mes_actual'
    ventas_mes_actual_df = ventas_mes_actual_df[['producto','fecha','cantidad']]
    ventas_mes_actual_df.columns = ['producto','fecha','cantidad']
    ventas_mes_actual_df.to_csv('data/ventas_mes_actual.csv', index=False)
    
    #transformar los datos de la tabla 'clientes_activos'
    clientes_activos_df = clientes_activos_df[['cliente','fecha','cantidad']]
    clientes_activos_df.columns = ['cliente','fecha','cantidad']
    clientes_activos_df.to_csv('data/clientes_activos.csv', index=False)
    
    #transformar los datos de la tabla 'compras_mes_actual'
    compras_mes_actual_df = compras_mes_actual_df[['proveedor','fecha','cantidad']]
    compras_mes_actual_df.columns = ['proveedor','fecha','cantidad']
    compras_mes_actual_df.to_csv('data/compras_mes_actual.csv', index=False)
    
    #transformar los datos de la tabla 'productos_activos'
    productos_activos_df = productos_activos_df[['id','nombre','descripcion','color','modelo','precio','stock_existencia','estatus','imagen']]
    productos_activos_df.columns = ['id','nombre','descripcion','color','modelo','precio','stock_existencia','estatus','imagen']
    productos_activos_df.to_csv('data/productos_activos.csv', index=False)
    
    
    
    
    
    

    print("Transformación de datos completada.")
