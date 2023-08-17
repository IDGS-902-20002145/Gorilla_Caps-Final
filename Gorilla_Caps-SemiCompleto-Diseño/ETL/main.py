from flask import Flask, request, jsonify
from flask_cors import CORS
from data_extraction.data_extractor import extract_data
from data_transformation.data_transformer import transform_data
from data_loading.data_loader import load_data

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

@app.route('/run_etl', methods=['POST'])
def run_etl():
    try:
        # Obtener los valores de start_date y end_date desde el cuerpo de la solicitud
        start_date = request.json['start_date']
        end_date = request.json['end_date']

        # Ejecuta el ETL con las fechas proporcionadas
        extract_data(start_date, end_date)
        transform_data()
        load_data()
        
        return jsonify({"message": "Proceso ETL ejecutado correctamente"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
