import dash
from dash import dcc, html, Input, Output
import dash_bootstrap_components as dbc
from dash_table import DataTable  # Actualización de la importación
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine

# Configurar la conexión a la base de datos SQLite
engine = create_engine('sqlite:///../datawerehouse_caps.db')

# Crear la aplicación Dash
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

server = app.server  # Obtener el objeto de servidor de Dash para habilitar CORS
CORS(server)

# Estilo para el div en forma de card
card_style = {
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    'border': '1px solid #ccc',
    'border-radius': '5px',
    'padding': '20px',
    'margin': '20px',
    'box-shadow': '0 3px 7px rgba(0, 0, 0, 0.1)',
}

card_title = {
    'text-align': 'center',
    'font-size': '18px',
    'margin-bottom': '10px'
}
        
icon_container = {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
}

icon_style = {
    'font-size': '2.0rem',
    'margin-right': '10px'
}




# Definir el layout del dashboard
app.layout = html.Div(children=[
    html.Link(rel="stylesheet", href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"),

        html.Div(children=[
            
            
            html.Div([
                    # Div con el contenido del card en el lado izquierdo
                    html.Div(children=[
                            html.H3('Indicadores',style={'text-align': 'center', 'font-size': '24px', 'margin-bottom': '20px', 'font-weight': 'bold'}),
                                    
                            html.Div([
                                html.Div([
                                    html.I(className='fas fa-wallet', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                                    html.Div([
                                        html.Span('Total de Ventas', className='card-title'),
                                        html.Span(id='ventas-mes-value', className='card-value', style={'font-weight': 'bold'})
                                    ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'flex-start'})
                                ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}),
                            ], style=card_style),
                            
                            html.Div([
                                html.Div([
                                    html.I(className='fas fa-file-invoice-dollar', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                                    html.Div([
                                        html.Span('Total de Compras', className='card-title'),
                                        html.Span(id='compras-mes-value', className='card-value', style={'font-weight': 'bold'})
                                    ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'flex-start'})
                                ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}),
                            ], style=card_style),
                            
                            html.Div([
                                html.Div([
                                    html.I(className='fas fa-users', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                                    html.Div([
                                        html.Span('Clientes Activos', className='card-title'),
                                        html.Span(id='clientes-activos-value', className='card-value', style={'font-weight': 'bold'})
                                    ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'flex-start'})
                                ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}),
                            ], style=card_style),
                            
                            html.Div([
                                html.Div([
                                    html.I(className='fas fa-book', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                                    html.Div([
                                        html.Span('Productos Activos', className='card-title'),
                                        html.Span(id='productos-activos-value', className='card-value', style={'font-weight': 'bold'})
                                    ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'flex-start'})
                                ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center'}),                                
                            ], style=card_style),                            
                           
                    ], style={'flex': '0 0 25%', 'display': 'flex', 'flex-direction': 'column', 'border': '1px solid #ccc',
                      'border-radius': '5px', 'background-color': '#f9f9f9', 'padding': '20px', 'margin-right': '20px'},\
                       className='divIzquierdo col-4'),
                    
                    # Div con el contenido del dashboard en el lado derecho
                    html.Div([
                        html.Div([
                        # Input para seleccionar la fecha de inicio
                            dcc.DatePickerSingle(
                                id='fecha-inicio-input',
                                display_format='YYYY-MM-DD',
                                date='2023-05-01',
                                style={'margin-right': '10px'}
                            ),

                            # Input para seleccionar la fecha de fin
                            dcc.DatePickerSingle(
                                id='fecha-fin-input',
                                display_format='YYYY-MM-DD',
                                date='2023-12-31',
                                style={'margin-left': '10px'}
                            ),
                            html.Br(),
                        ],  style={'display': 'flex', 'align-items': 'center', 'margin-bottom': '20px'}),

                        html.Div(children=[
                                html.Div([                                    
                                    dcc.Graph(id='ventas-por-producto-graph'),
                                ], style={'flex': '1', 'margin-right': '20px', 'padding': '20px', 'border': '1px solid #ccc',
                                        'border-radius': '5px', 'margin-bottom': '20px'}, className='container col-6'),

                                html.Div([                                    
                                    dcc.Graph(id='compras-por-proveedor-graph'),
                                ], style={'flex': '1', 'margin-right': '20px', 'padding': '20px', 'border': '1px solid #ccc',
                                        'border-radius': '5px', 'margin-bottom': '20px'}, className='container col-6'),
                        ], style={'display': 'flex', 'flex-wrap': 'wrap', 'justify-content': 'space-between', 'margin-bottom': '20px'}),

                        html.Div(children=[
                                html.Div([
                                    html.H4('Top 5 Clientes', style={'text-align': 'center'}),
                                    # Agregar la tabla del top 5 de clientes aquí
                                    DataTable(
                                        id='top-5-clientes-table',
                                        columns=[
                                            {'name': 'Nombre del Cliente', 'id': 'NombreCliente'},
                                            {'name': 'Cantidad de Compras', 'id': 'CantidadCompras'}
                                        ],
                                        data=[],  # Aquí irá la data que se actualizará mediante el callback
                                        style_table={'height': '300px', 'overflowY': 'auto'},
                                        style_header={
                                            'backgroundColor': '#DEDEDE',  # Color de fondo del encabezado
                                            'fontWeight': 'bold',          # Texto en negritas
                                            'textAlign': 'center'          # Centrar el texto en el encabezado
                                        },
                                        style_cell={
                                            'textAlign': 'center',         # Centrar el texto en las celdas
                                            'backgroundColor': '#f9f9f9',  # Color de fondo de las celdas
                                            'color': 'black'               # Color del texto en las celdas
                                        },
                                        style_data={
                                            'border': '1px solid #ccc'     # Borde de las celdas
                                        }
                                    ),                  
                                ], style={'flex': '1', 'margin-right': '20px', 'padding': '20px', 'border': '1px solid #ccc',
                                        'border-radius': '5px', 'margin-bottom': '20px'}, className='container col-6'),

                                html.Div([                                    
                                    dcc.Graph(id='utilidad-por-mes-graph'),
                                ], style={'flex': '1', 'margin-right': '20px', 'padding': '20px', 'border': '1px solid #ccc',
                                        'border-radius': '5px', 'margin-bottom': '20px'}, className='container col-6'),  
                                            
                        ], style={'display': 'flex', 'flex-wrap': 'wrap', 'justify-content': 'space-between'}),               
                    ], style={'flex': '1', 'display': 'flex', 'flex-direction': 'column', 'border': '1px solid #ccc',
                      'border-radius': '5px', 'background-color': '#f9f9f9', 'padding': '20px'},\
                       className='divDerecho col-8'),               
            ], style={'display': 'flex', 'justify-content': 'space-between', 'background-color': 'black', 'padding': '20px;'},\
               className='divPrincipal row'),   
            
            # Div Secundario
            html.Div([
                html.H2('Materia Prima'),
                dbc.Row(id='materia-prima-cards'),  # Div para mostrar las cards de materia prima
            ],style={'margin-top': '20px', 'border': '1px solid #ccc', 'border-radius': '5px', 'background-color': '#f9f9f9', 'padding': '20px'},\
               className='divSecundario row'),    
        ], style={'display': 'flex', 'flex-direction': 'column', 'background-color': 'black', 'font-family': 'Arial, sans-serif', 'color': 'black'}),
],style={'background-color': 'black'})


# Definir estilos CSS
app.css.append_css({
    # 'external_url': '/dashboard/dash.css',  # Reemplaza con la URL o ruta al archivo CSS
    'external_url': 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',  # Enlace a Bootstrap CSS
    'code': '''
         .card-style {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            margin: 20px;
            box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
        }
        
        .card-title {
            font-size: 15px;
            margin-bottom: 5px;           
        }
        
        .card-value {
            font-size: 13px;
            font-weight: bold;
        }
    ''',
})


# Callback para actualizar los indicadores cuando se cambian las fechas
@app.callback(
    [Output('clientes-activos-value', 'children'),
     Output('compras-mes-value', 'children'),
     Output('productos-activos-value', 'children'),
     Output('ventas-mes-value', 'children')],
    [Input('fecha-inicio-input', 'date'),
     Input('fecha-fin-input', 'date')]
)
def indicadores(fecha_inicio, fecha_fin):
    clientes_activos_df = pd.read_sql(f"SELECT COUNT(*) AS Clientes_Activos FROM [user]\
                                      WHERE active = 1 AND admin = 0 AND empleado = 0;", engine)
    
    compras_mes_actual_df = pd.read_sql(f"SELECT SUM(d.Precio * d.Cantidad) AS Total_Compras\
                                        FROM Compra c INNER JOIN DetCompra d ON c.id = d.compra_id\
                                        WHERE c.fecha >= '{fecha_inicio}' AND c.fecha <= '{fecha_fin}'\
                                        AND c.estatus = 1;", engine)
    
    productos_activos_df = pd.read_sql(f"SELECT COUNT(*) AS Productos_Activos FROM Producto\
                                       WHERE estatus = 1 AND stock_existencia > 0;", engine)
    
    ventas_mes_actual_df = pd.read_sql(f"SELECT SUM(D.Precio * D.Cantidad) AS Ventas_Totales\
                                       FROM VENTA V\
                                       INNER JOIN DetVenta D ON V.Id = D.VentaId\
                                       WHERE V.fecha >= '{fecha_inicio}' AND V.fecha <= '{fecha_fin}'\
                                       AND V.Estatus = 1;", engine)
    
    return f"{clientes_activos_df['Clientes_Activos'].iloc[0]}",\
           f"${compras_mes_actual_df['Total_Compras'].iloc[0]:,.2f}",\
           f"{productos_activos_df['Productos_Activos'].iloc[0]}",\
           f"${ventas_mes_actual_df['Ventas_Totales'].iloc[0]:,.2f}"


# Callback para actualizar las gráficas cuando se cambian las fechas
@app.callback(
    [Output('compras-por-proveedor-graph', 'figure'),
     Output('top-5-clientes-table', 'data'),
     Output('utilidad-por-mes-graph', 'figure'),
     Output('ventas-por-producto-graph', 'figure'),
     Output('materia-prima-cards', 'children'),
     ],
    [Input('fecha-inicio-input', 'date'),
     Input('fecha-fin-input', 'date')]
)
def update_graphs(fecha_inicio, fecha_fin):
    # Obtener los datos del data warehouse filtrados por las fechas seleccionadas
    compras_mes_actual_df = pd.read_sql(f"SELECT * FROM compras_mes_actual WHERE fecha BETWEEN '{fecha_inicio}' AND '{fecha_fin}'", engine)

    # Crear las gráficas con los datos filtrados
    compras_por_proveedor_graph = {
        'data': [
            {'x': compras_mes_actual_df['proveedor'], 'y': compras_mes_actual_df['cantidad'], 'type': 'bar', 'name': 'Ventas',
            'marker': {'color': '#ff7f0e'}}  # Color naranja
        ],
        'layout': {
            'title': {
                'text': 'Compras al proveedor por mes',
                'font': {'size': 24},
            },
            'xaxis': {
                'title': 'Proveedor',
                'showgrid': False,
                'tickangle': -45,
                'automargin': True,
                'tickfont': {'size': 12},
            },
            'yaxis': {
                'title': 'Total de Compras',
                'showgrid': True,
                'gridcolor': '#e5e5e5',
                'tickfont': {'size': 12},
                'ticksuffix': '$',
            },
            'barmode': 'group',
            'bargap': 0.1,
            'bargroupgap': 0.2,
            'hovermode': 'closest',
            'plot_bgcolor': '#f9f9f9',
            'paper_bgcolor': '#f9f9f9',
            'font': {
                'color': 'black',
                'size': 12,
            }
        }
    }
    
    ventas_producto_por_mes_df = pd.read_sql(f"SELECT strftime('%Y', v.Fecha) AS Anio,\
                                                      strftime('%m', v.Fecha) AS Mes,\
                                                      p.id AS ProductoId,\
                                                      p.nombre AS NombreProducto,\
                                                      SUM(dv.cantidad) AS TotalCantidad,\
                                                      SUM(dv.precio * dv.cantidad) AS TotalVenta\
                                               FROM Venta v\
                                               INNER JOIN DetVenta dv ON v.Id = dv.VentaId\
                                               INNER JOIN Producto p ON dv.ProductoId = p.id\
                                               WHERE v.Estatus = 1 AND v.Fecha BETWEEN '{fecha_inicio}' AND '{fecha_fin}'\
                                               GROUP BY Anio, Mes, p.id, p.nombre\
                                               ORDER BY Anio, Mes, p.id;", engine)
    
    ventas_producto_graph = {
        'data': [
            {
                'x': ventas_producto_por_mes_df['NombreProducto'],
                'y': ventas_producto_por_mes_df['TotalVenta'],
                'type': 'bar',
                'name': 'Ventas',
                'marker': {'color': '#1f77b4'}  # Color azul
            }
        ],
        'layout': {
            'title': {
                'text': 'Ventas de productos por mes',
                'font': {'size': 24},
            },
            'xaxis': {
                'title': 'Producto',
                'showgrid': False,
                'tickangle': -45,
                'automargin': True,
                'tickfont': {'size': 12},
            },
            'yaxis': {
                'title': 'Total de Ventas',
                'showgrid': True,
                'gridcolor': '#e5e5e5',
                'tickfont': {'size': 12},
                'ticksuffix': '$',
            },
            'barmode': 'group',
            'bargap': 0.1,
            'bargroupgap': 0.2,
            'hovermode': 'closest',
            'plot_bgcolor': '#f9f9f9',
            'paper_bgcolor': '#f9f9f9',
            'font': {
                'color': 'black',
                'size': 12,
            }
        }
    }


    
    top5_clientes_por_mes_df = pd.read_sql(f"SELECT u.name AS NombreCliente, COUNT(v.Id) AS CantidadCompras\
                                       FROM [user] u\
                                       INNER JOIN Venta v ON u.Id = v.UserId\
                                       WHERE v.Fecha >= '{fecha_inicio}' AND v.Fecha <= '{fecha_fin}'\
                                       GROUP BY u.id, u.name\
                                       ORDER BY CantidadCompras DESC\
                                       LIMIT 5;", engine)
    
    
    utilidad_por_mes_df = pd.read_sql(f"SELECT strftime('%Y', Fecha) AS Anio, strftime('%m', Fecha) AS Mes,\
                                      SUM(TotalVenta) - SUM(TotalCompra) AS Ganancia\
                                      FROM(\
                                        SELECT v.Id AS VentaId, v.Fecha, SUM(dv.precio * dv.cantidad) AS TotalVenta,\
                                        0 AS TotalCompra\
                                        FROM Venta v\
                                        INNER JOIN DetVenta dv ON v.Id = dv.VentaId\
                                        WHERE v.Fecha >= '{fecha_inicio}' AND v.Fecha <= '{fecha_fin}'\
                                        GROUP BY v.Id, v.Fecha\
                                        UNION ALL\
                                        SELECT c.id AS VentaId, c.fecha, 0 AS TotalVenta, SUM(dc.precio * dc.cantidad) AS TotalCompra\
                                        FROM Compra c\
                                        INNER JOIN DetCompra dc ON c.Id = dc.compra_id\
                                        WHERE c.Fecha >= '{fecha_inicio}' AND c.Fecha <= '{fecha_fin}'\
                                        GROUP BY c.id, c.fecha\
                                      ) AS Resultados\
                                      GROUP BY Anio, Mes\
                                      ORDER BY Anio, Mes;", engine)
    
    
    materiaPrimas_df = pd.read_sql(f"SELECT * FROM inventario_materia_prima WHERE estatus=true", engine)
    
    utilidad_por_mes_graph = {
        'data': [
            {'x': utilidad_por_mes_df['Anio'].astype(str) + '-' + utilidad_por_mes_df['Mes'].astype(str),
            'y': utilidad_por_mes_df['Ganancia'], 'type': 'line', 'name': 'Ganancia', 'line': {'color': 'green'}}
        ],
        'layout': {
            'title': {
                'text': 'Utilidad por mes',
                'font': {'size': 24},
            },
            'xaxis': {
                'title': 'Mes',
                'showgrid': False,
                'tickangle': -45,
                'automargin': True,
                'tickfont': {'size': 12},
            },
            'yaxis': {
                'title': 'Ganancia',
                'showgrid': True,
                'gridcolor': '#e5e5e5',
                'tickfont': {'size': 12},
                'ticksuffix': '$',
            },
            'hovermode': 'closest',
            'plot_bgcolor': '#f9f9f9',
            'paper_bgcolor': '#f9f9f9',
            'font': {
                'color': 'black',
                'size': 12,
            }
        }
    }

    # Crear las cards de materia prima con los datos filtrados
    cards_materia_prima = []
    for index, material in materiaPrimas_df.iterrows():
        if material['cantidad'] <= material['stock_minimo']:
            td_style = "bg-danger"
            td_style2 = "fa-solid fa-face-dizzy fa-shake"
            text_color = "white"
        elif material['cantidad'] <= material['stock_minimo'] + 40:
            td_style = "bg-warning"
            td_style2 = "fa-solid fa-face-grimace fa-beat-fade"
            text_color = "black"
        else:
            td_style = "bg-success"
            td_style2 = "fa-solid fa-face-laugh"
            text_color = "white"

        card = dbc.Card(
            dbc.CardBody([
                html.I(className=td_style2, style={'font-size': '2rem'}),
                html.H4(material['nombre'], className='card-title', style={'color': 'lightcyan', 'text-align': 'center'}),
                html.P(f"{material['cantidad']} unidades en el inventario", className='card-text', style={'color': text_color})
            ]),
            className=td_style + ' col-xl-2 col-md-4 mb-3',
            style={
                'border': 'none',
                'border-radius': '10px',
                'box-shadow': '0px 4px 8px rgba(0, 0, 0, 0.1)',
                'margin': '10px',  # Espaciado entre las cards
                'transition': 'transform 0.2s ease-in-out',  # Animación de transformación suave
                'cursor': 'pointer',  # Cambiar el cursor al pasar por encima
            },
            id={'type': 'material-card', 'index': index}  # Agregar un identificador único a cada card
        )
        cards_materia_prima.append(card)

    # Devolver el diccionario del gráfico y los datos de la tabla
    return compras_por_proveedor_graph, top5_clientes_por_mes_df.to_dict('records'), utilidad_por_mes_graph, ventas_producto_graph,cards_materia_prima


if __name__ == '__main__':
    app.run_server(debug=True)
