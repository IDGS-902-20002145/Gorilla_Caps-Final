import dash
import calendar
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
    'boxShadow': '0 3px 7px rgba(0, 0, 0, 0.1)',
    'transition': 'background-color 0.3s ease-in-out',
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


# Definir estilos CSS
app.css.append_css({
    # 'external_url': '/dashboard/dash.css',  # Reemplaza con la URL o ruta al archivo CSS
    'external_url': 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',  # Enlace a Bootstrap CSS
    'external_url': 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',  # Enlace a animate.css
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
        
        .card-style:hover {
            background-color: #eaeaea;
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
}),


def extract_month():    
    # Obtener meses y años únicos desde la base de datos
    query_meses_anios = "SELECT DISTINCT Anio, Mes FROM ventas_producto_por_mes;"
    meses_anios_df = pd.read_sql(query_meses_anios, engine) 
    
    nombres_meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    return [{'label': nombres_meses[mes - 1], 'value': mes} for mes in meses_anios_df['Mes']]


def extract_year():
    # Obtener meses y años únicos desde la base de datos
    query_meses_anios = "SELECT DISTINCT Anio, Mes FROM ventas_producto_por_mes;"
    meses_anios_df = pd.read_sql(query_meses_anios, engine)
    anios_options = []
    anios_agregados = set()  # Conjunto para rastrear los años ya agregados

    for anio in meses_anios_df['Anio']:
        if anio not in anios_agregados:
            anios_options.append({'label': anio, 'value': anio})
            anios_agregados.add(anio)  # Agregar el año al conjunto de años agregados
            
    return anios_options


@app.callback(
    Output('mes-dropdown', 'options'),
    Output('anio-dropdown', 'options'),
    Input('mes-dropdown', 'value'),
    Input('anio-dropdown', 'value')
)
def update_dropdowns(selected_month, selected_year):
    meses_options = extract_month()
    anios_options = extract_year()
    return meses_options, anios_options

# Definir el layout del dashboard
app.layout = html.Div(children=[
    html.Link(rel="stylesheet", href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"),
    html.Link(rel="stylesheet", href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"), 
    
        
    # Div Superior
    html.Div([
        # Contenido del card en el lado izquierdo, organizado horizontalmente
        html.Div([
            html.Div([
                html.I(className='fas fa-wallet', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                html.Div([
                    html.Span('Total de Ventas', className='card-title'),
                    html.Span(id='ventas-mes-value', className='card-value', style={'font-weight': 'bold'})
                ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'})
            ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'border-radius': '5px',
                    'background-color': '#f9f9f9', 'padding': '10px', 'margin-right': '10px'},
            className='card shadow p-3 card-style animate__animated animate__fadeInLeft animate__faster'),
            html.Div([
                html.I(className='fas fa-file-invoice-dollar', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                html.Div([
                    html.Span('Total de Compras', className='card-title'),
                    html.Span(id='compras-mes-value', className='card-value', style={'font-weight': 'bold'})
                ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'})
            ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'border-radius': '5px',
                    'background-color': '#f9f9f9', 'padding': '10px', 'margin-right': '10px'},
            className='card shadow'),
            html.Div([
                html.I(className='fas fa-users', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                html.Div([
                    html.Span('Clientes Activos', className='card-title'),
                    html.Span(id='clientes-activos-value', className='card-value', style={'font-weight': 'bold'})
                ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'})
            ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'border-radius': '5px',
                    'background-color': '#f9f9f9', 'padding': '10px', 'margin-right': '10px'},
            className='card shadow'),
            html.Div([
                html.I(className='fas fa-book', style={'font-size': '1.5rem', 'margin-right': '10px'}),
                html.Div([
                    html.Span('Productos Activos', className='card-title'),
                    html.Span(id='productos-activos-value', className='card-value', style={'font-weight': 'bold'})
                ], style={'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'})
            ], style={'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'border-radius': '5px',
                    'background-color': '#f9f9f9', 'padding': '10px', 'margin-right': '10px'},
            className='card shadow'),
        ], style={'display': 'flex', 'justify-content': 'space-between', 'border-radius': '5px',
                'padding': '10px', 'margin-right': '10px'},
        className='divIzquierdo col-12 cards-container'),
    ], style={'background-color': '#CCE4F3', 'padding': '1px'}),


    # Div Principal
    html.Div([
        html.Div([
            html.Div([
                    html.Div(
                        [
                            html.Label('Filtrar por:', style={'text-align': 'right'}),
                            html.Div(
                                [
                                    html.Label('Mes:', style={'margin-right': '10px'}),
                                    dcc.Dropdown(
                                        id='mes-dropdown',
                                        options= [],
                                        multi=False,
                                        placeholder='Selecciona meses...',
                                        style={'flex': '2'}
                                    ),
                                ],
                                style={'display': 'flex', 'align-items': 'center', 'margin-bottom': '20px', 'width': '100%'}
                            ),
                            html.Div(
                                [
                                    html.Label('Año:', style={'margin-right': '10px'}),
                                    dcc.Dropdown(
                                        id='anio-dropdown',
                                        options= [],
                                        multi=False,
                                        placeholder='Selecciona años...',
                                        style={'flex': '2'}
                                    ),
                                ],
                                style={'display': 'flex', 'align-items': 'center', 'margin-bottom': '20px', 'width': '100%'}
                            ),
                        ],
                        style={
                            'display': 'flex',
                            'flex-direction': 'column',
                            'align-items': 'flex-start',
                            'border': '1px solid #ccc',
                            'border-radius': '5px',
                            'padding': '10px',
                            'background-color': '#f9f9f9',
                            'box-shadow': '0 3px 7px rgba(0, 0, 0, 0.1)',
                            'transition': 'background-color 0.3s ease-in-out',
                            'width': '300px'
                        }
                    ),
            ],style={'margin-bottom': '20px', 'align-items': 'flex-end',}),



            html.Div(
                children=[
                    html.Div(
                        [
                            # Gráfica de ventas por producto
                            dcc.Graph(id='ventas-por-producto-graph'),
                        ],
                        style={
                            'flex': '1',
                            'margin-right': '10px',
                            'padding': '10px',
                            'border': '1px solid black',
                            'border-radius': '5px',
                            'margin-bottom': '20px',
                            'background-color': '#CCE4F3',  # Azul oscuro
                        },
                        className='container col-6',
                    ),
                    
                    html.Div(
                        [
                            # Tabla de ventas por producto
                            html.Div(
                                [
                                    html.H4('Venta de Productos por Mes', style={'text-align': 'center'}),
                                    DataTable(
                                        id='ventas-por-producto-table',
                                        columns=[
                                            {'name': 'Nombre del Producto', 'id': 'NombreProducto'},
                                            {'name': 'Cantidad Comprada', 'id': 'TotalCantidad'},
                                            {'name': 'Total de Ventas', 'id': 'TotalVenta'},
                                        ],
                                        data=[],
                                        style_table={'height': '300px', 'overflowY': 'auto'},
                                        style_header={
                                            'backgroundColor': '#589CC9',  # Azul medio
                                            'fontWeight': 'bold',
                                            'textAlign': 'center',
                                        },
                                        style_cell={
                                            'textAlign': 'center',
                                            'backgroundColor': '#f9f9f9',
                                            'color': 'black',
                                            
                                        },
                                        style_data={'border': '1px solid black'},
                                    ),
                                ],
                                style={
                                    'flex': '1',
                                    'margin-right': '1px',
                                    'padding': '10px',
                                    'border': '1px solid black',
                                    'border-radius': '5px',
                                    'margin-bottom': '20px',
                                    'width': 'calc(100% - 10px)',
                                    'background-color': '#CCE4F3',  # Azul oscuro
                                },
                                className='col-6',
                            ),
                        ],
                        className='col-6',
                    ),                     
                ],
                style={
                    'display': 'flex',
                    'margin-right': '1px',
                    'flex-wrap': 'wrap',                        
                    'justify-content': 'space-between',
                    'margin-bottom': '20px',
                    'background-color': '#f9f9f9',  # Azul oscuro
                },
            ),

            html.Div(
                [
                    # Gráfica de compras por proveedor
                    dcc.Graph(id='compras-por-proveedor-graph'),
                ],
                style={
                    'flex': '1',
                    'margin-left': '1px',
                    'margin-right': '1px',
                    'padding': '10px',
                    'border': '1px solid black',
                    'border-radius': '5px',
                    'margin-bottom': '20px',
                    'background-color': '#CCE4F3',  # Verde oscuro
                },
                className='row',
            ),

            html.Div(
                children=[
                    html.Div([
                        html.H4('Top 5 Clientes', style={'text-align': 'center'}),
                        # Agregar la tabla del top 5 de clientes aquí
                        DataTable(
                            id='top-5-clientes-table',
                            columns=[
                                {'name': 'Nombre del Cliente', 'id': 'NombreCliente'},
                                {'name': 'Cantidad de Compras', 'id': 'CantidadCompras'}
                            ],
                            data=[],
                            style_table={'height': '300px', 'overflowY': 'auto'},
                            style_header={
                                'backgroundColor': '#589CC9',  # Azul medio
                                'fontWeight': 'bold',
                                'textAlign': 'center'
                            },
                            style_cell={
                                'textAlign': 'center',
                                'backgroundColor': '#f9f9f9',
                                'color': 'black'
                            },
                            style_data={
                                'border': '1px solid black'
                            }
                        ),
                    ], style={'flex': '1', 'margin-right': '20px', 'padding': '20px', 'border': '1px solid black',
                            'border-radius': '5px', 'margin-bottom': '20px', 'background-color': '#CCE4F3'},  # Azul claro
                        className='container col-5'),

                    html.Div([
                        dcc.Graph(id='utilidad-por-mes-graph'),
                    ], style={'flex': '1', 'margin-right': '20px', 'padding': '20px', 'border': '1px solid black',
                            'border-radius': '5px', 'margin-bottom': '20px', 'background-color': '#CCE4F3',  'margin-right': '1px'},  # Verde oscuro
                        className='container col-7'),
                ],
                style={'display': 'flex', 'flex-wrap': 'wrap', 'justify-content': 'space-between'},
            ),
        ], style={'flex': '1', 'display': 'flex', 'flex-direction': 'column', 'border': '1px solid #ccc',
                'border-radius': '5px', 'background-color': '#f9f9f9', 'padding': '10px'},
            className='divDerecho col-12'),
    ], style={'background-color': '#CCE4F3', 'padding': '1px'}),

        
    # Div Secundario
    html.Div([
        html.H2('Materia Prima'),
        dbc.Row(id='materia-prima-cards'),  # Div para mostrar las cards de materia prima
    ], style={'margin-top': '20px', 'border': '1px solid black', 'border-radius': '5px', 'background-color': '#CCE4F3',
            'padding': '10px', 'margin-right': '10px', 'margin-left': '10px',}, className='divSecundario row'),
], style={'background-color': '#f9f9f9'})
        
        

        





# Callback para actualizar los indicadores cuando se cambian las fechas
@app.callback(
    [Output('clientes-activos-value', 'children'),
     Output('compras-mes-value', 'children'),
     Output('productos-activos-value', 'children'),
     Output('ventas-mes-value', 'children')],
    [Input('mes-dropdown', 'value'),
     Input('anio-dropdown', 'value')]
)
def indicadores(selected_meses, selected_anios):
    if selected_meses is None or selected_anios is None:
        clientes_activos_df = pd.read_sql(f"SELECT * FROM clientes_activos", engine)
        
        compras_mes_actual_df = pd.read_sql(f"SELECT SUM(Total_Compras) AS Compras from compras_mes_actual", engine)
        
        productos_activos_df = pd.read_sql(f"SELECT * from Productos_Activos", engine)
        
        ventas_mes_actual_df = pd.read_sql(f"SELECT SUM(Ventas_Totales)AS Total FROM ventas_mes_actual", engine)
        
        return f"{clientes_activos_df['Clientes_Activos'].iloc[0]}",\
            f"${compras_mes_actual_df['Compras'].iloc[0]:,.2f}",\
            f"{productos_activos_df['Productos_Activos'].iloc[0]}",\
            f"${ventas_mes_actual_df['Total'].iloc[0]:,.2f}"
    
    else:    
        clientes_activos_df = pd.read_sql(f"SELECT * FROM clientes_activos", engine)
        
        compras_mes_actual_df = pd.read_sql(f"SELECT * from compras_mes_actual WHERE Mes = {selected_meses}\
                                             AND Anio = {selected_anios}", engine)
        
        productos_activos_df = pd.read_sql(f"SELECT * from Productos_Activos", engine)
        
        ventas_mes_actual_df = pd.read_sql(f"SELECT * FROM ventas_mes_actual WHERE Mes = {selected_meses}\
                                             AND Anio = {selected_anios}", engine)
        
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
     Output('ventas-por-producto-table', 'data')],
    [Input('mes-dropdown', 'value'),
     Input('anio-dropdown', 'value')]
)
def update_graphs(selected_meses, selected_anios):     
    if selected_meses is None or selected_anios is None:
        
        # Obtener los datos del data warehouse filtrados por las fechas seleccionadas
        compras_por_proveedor_df = pd.read_sql(f"SELECT * FROM compras_por_proveedor;", engine)

        # Crear las gráficas con los datos filtrados
        compras_por_proveedor_graph = {
            'data': [
                {'x': compras_por_proveedor_df['NombreProveedor'], 'y': compras_por_proveedor_df['TotalCompra'], 'type': 'bar', 'name': 'Ventas',
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
        
        ventas_producto_por_mes_df = pd.read_sql(f"SELECT * from ventas_producto_por_mes", engine)
        
        ventas_producto_por_mes_tb = pd.read_sql(f"SELECT * from ventas_producto_por_mes ORDER BY TotalVenta DESC;", engine)
        
        ventas_producto_por_mes_tb['TotalVenta']= ventas_producto_por_mes_tb['TotalVenta'].apply(lambda x: f"${x}")
        
        # Aplicar el substring a la columna 'NombreProducto'
        ventas_producto_por_mes_df['NombreProducto'] = ventas_producto_por_mes_df['NombreProducto'].str[14:]
        
        ventas_producto_graph = {
            'data': [
                {
                    'x': ventas_producto_por_mes_df['NombreProducto'],
                    'y': ventas_producto_por_mes_df['TotalCantidad'],
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
                    'title': 'Total de Piezas Vendidas',
                    'showgrid': True,
                    'gridcolor': '#e5e5e5',
                    'tickfont': {'size': 12},                
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


        
        top5_clientes_por_mes_df = pd.read_sql(f"SELECT * from top5_clientes_por_mes;", engine)
        
        
        utilidad_por_mes_df = pd.read_sql(f"SELECT * from utilidad_por_mes", engine)
        
        
        materiaPrimas_df = pd.read_sql(f"SELECT * FROM inventario_materia_prima;", engine)
        
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
                    'tickfont': {'size': 10},
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
        return compras_por_proveedor_graph,top5_clientes_por_mes_df.to_dict('records'), utilidad_por_mes_graph, ventas_producto_graph, cards_materia_prima, ventas_producto_por_mes_tb.to_dict('records')


        
    else:
        # Obtener los datos del data warehouse filtrados por las fechas seleccionadas
        compras_por_proveedor_df = pd.read_sql(f"SELECT * FROM compras_por_proveedor WHERE Anio = {selected_anios}\
                                                AND Mes = {selected_meses};", engine)

        # Crear las gráficas con los datos filtrados
        compras_por_proveedor_graph = {
            'data': [
                {'x': compras_por_proveedor_df['NombreProveedor'], 'y': compras_por_proveedor_df['TotalCompra'], 'type': 'bar', 'name': 'Ventas',
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
        
        ventas_producto_por_mes_df = pd.read_sql(f"SELECT * from ventas_producto_por_mes WHERE Anio = {selected_anios}\
                                                AND Mes = {selected_meses}", engine)
        
        
        ventas_producto_por_mes_tb = pd.read_sql(f"SELECT * from ventas_producto_por_mes WHERE Anio = {selected_anios}\
                                                AND Mes = {selected_meses} ORDER BY TotalVenta DESC;", engine)
        
        ventas_producto_por_mes_tb['TotalVenta']= ventas_producto_por_mes_tb['TotalVenta'].apply(lambda x: f"${x}")
        
        # Aplicar el substring a la columna 'NombreProducto'
        ventas_producto_por_mes_df['NombreProducto'] = ventas_producto_por_mes_df['NombreProducto'].str[14:]
        
        ventas_producto_graph = {
            'data': [
                {
                    'x': ventas_producto_por_mes_df['NombreProducto'],
                    'y': ventas_producto_por_mes_df['TotalCantidad'],
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
                    'title': 'Total de Piezas Vendidas',
                    'showgrid': True,
                    'gridcolor': '#e5e5e5',
                    'tickfont': {'size': 12},                
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


        
        top5_clientes_por_mes_df = pd.read_sql(f"SELECT * from top5_clientes_por_mes;", engine)
        
        
        utilidad_por_mes_df = pd.read_sql(f"SELECT * from utilidad_por_mes WHERE Anio = {selected_anios}\
                                                AND Mes = {selected_meses}", engine)
        
        
        materiaPrimas_df = pd.read_sql(f"SELECT * FROM inventario_materia_prima;", engine)
        
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
                    'tickfont': {'size': 10},
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
        return compras_por_proveedor_graph,top5_clientes_por_mes_df.to_dict('records'), utilidad_por_mes_graph, ventas_producto_graph, cards_materia_prima, ventas_producto_por_mes_tb.to_dict('records')


if __name__ == '__main__':
    app.run_server(debug=True)
