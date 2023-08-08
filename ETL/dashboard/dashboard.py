import dash
from dash import dcc, html, Input, Output
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import dash_bootstrap_components as dbc

# Configurar la conexión a la base de datos SQLite
engine = create_engine('sqlite:///../datawerehouse_caps.db')

# Crear la aplicación Dash
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
server = app.server  # Obtener el objeto de servidor de Dash para habilitar CORS
CORS(server)

# Definir el layout del dashboard
app.layout = html.Div(children=[
    html.H1('Dashboard de Ventas y Compras'),

    # Input para seleccionar la fecha de inicio
    dcc.DatePickerSingle(
        id='fecha-inicio-input',
        display_format='YYYY-MM-DD',
        date='2023-06-01'
    ),

    # Input para seleccionar la fecha de fin
    dcc.DatePickerSingle(
        id='fecha-fin-input',
        display_format='YYYY-MM-DD',
        date='2023-08-31'
    ),

    html.H2('Ventas por Producto'),
    dcc.Graph(id='ventas-por-producto-graph'),

    html.H2('Materia Prima'),
    dbc.Row(id='materia-prima-cards'),  # Div para mostrar las cards de materia prima

    # Agregar más gráficas para las otras métricas del data warehouse...
])

# Callback para actualizar las gráficas cuando se cambian las fechas
@app.callback(
    Output('ventas-por-producto-graph', 'figure'),
    Output('materia-prima-cards', 'children'),
    [Input('fecha-inicio-input', 'date'),
     Input('fecha-fin-input', 'date')]
)
def update_graphs(fecha_inicio, fecha_fin):
    # Obtener los datos del data warehouse filtrados por las fechas seleccionadas
    compras_mes_actual_df = pd.read_sql(f"SELECT * FROM compras_mes_actual WHERE fecha BETWEEN '{fecha_inicio}' AND '{fecha_fin}'", engine)
    materiaPrimas_df = pd.read_sql(f"SELECT * FROM inventario_materia_prima WHERE estatus=true", engine)

    # Crear las gráficas con los datos filtrados (ventas por producto)
    ventas_por_producto_graph = {
        'data': [
            {'x': compras_mes_actual_df['proveedor'], 'y': compras_mes_actual_df['cantidad'], 'type': 'bar', 'name': 'Ventas'}
        ],
        'layout': {
            'title': 'Ventas por Producto'
        }
    }

    # Crear las cards de materia prima con los datos filtrados
    cards_materia_prima = []
    for index, material in materiaPrimas_df.iterrows():
        if material['cantidad'] <= material['stock_minimo']:
            td_style = "bg-danger"
            td_style2 = "fa-solid fa-face-dizzy fa-shake"
        elif material['cantidad'] <= material['stock_minimo'] + 40:
            td_style = "bg-warning"
            td_style2 = "fa-solid fa-face-grimace fa-beat-fade"
        else:
            td_style = "bg-success"
            td_style2 = "fa-solid fa-face-laugh"
            
        card = dbc.Card(
            dbc.CardBody([
                html.I(className=td_style2),
                html.H4(material['nombre'], className='card-title', style={'color': 'lightcyan', 'text-align': 'center'}),
                html.P(f"{material['cantidad']} unidades en el inventario", className='card-text')
            ]),
            className=td_style + ' col-xl-2 col-md-4 mb-3',
        )
        cards_materia_prima.append(card)

    # Devolver los diccionarios de los gráficos y las cards, sin colocarlos en una lista
    return ventas_por_producto_graph, cards_materia_prima

if __name__ == '__main__':
    app.run_server(debug=True)
