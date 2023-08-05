import dash
from dash import dcc, html, Input, Output
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine

# Configurar la conexión a la base de datos SQLite
engine = create_engine('sqlite:///../datawerehouse_caps.db')

# Crear la aplicación Dash
app = dash.Dash(__name__)
server = app.server  # Obtener el objeto de servidor de Dash para habilitar CORS
CORS(server)
# Definir el layout del dashboard
app.layout = html.Div(children=[
    html.H1('Dashboard de Ventas y Compras'),

    # Input para seleccionar la fecha de inicio
    dcc.DatePickerSingle(
        id='fecha-inicio-input',
        display_format='YYYY-MM-DD',
        date='2023-01-01'
    ),

    # Input para seleccionar la fecha de fin
    dcc.DatePickerSingle(
        id='fecha-fin-input',
        display_format='YYYY-MM-DD',
        date='2023-12-31'
    ),

    html.H2('Ventas por Producto'),
    dcc.Graph(id='ventas-por-producto-graph'),

    # Agregar más gráficas para las otras métricas del data warehouse...
])

# Callback para actualizar las gráficas cuando se cambian las fechas
@app.callback(
    Output('ventas-por-producto-graph', 'figure'),
    [Input('fecha-inicio-input', 'date'),
     Input('fecha-fin-input', 'date')]
)
def update_graphs(fecha_inicio, fecha_fin):
    # Obtener los datos del data warehouse filtrados por las fechas seleccionadas
    compras_mes_actual_df = pd.read_sql(f"SELECT * FROM compras_mes_actual WHERE fecha BETWEEN '{fecha_inicio}' AND '{fecha_fin}'", engine)

    # Crear las gráficas con los datos filtrados
    ventas_por_producto_graph = {
        'data': [
            {'x': compras_mes_actual_df['proveedor'], 'y': compras_mes_actual_df['cantidad'], 'type': 'bar', 'name': 'Ventas'}
        ],
        'layout': {
            'title': 'Ventas por Producto'
        }
    }

    # Devolver el diccionario del gráfico, sin colocarlo en una lista
    return ventas_por_producto_graph

if __name__ == '__main__':
    app.run_server(debug=True)
