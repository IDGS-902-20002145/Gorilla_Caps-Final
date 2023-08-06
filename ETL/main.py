import subprocess
from flask import Flask, request, jsonify
import os
from data_extraction.data_extractor import extract_data
from data_transformation.data_transformer import transform_data
from data_loading.data_loader import load_data
from flask_cors import CORS

app = Flask(__name__)
# Habilitar CORS para permitir solicitudes desde http://localhost:4200
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

@app.route('/run_etl', methods=['POST'])
def run_etl():
    try:
        # Ejecuta el ETL con las fechas proporcionadas
        extract_data()
        transform_data()
        load_data()
        return jsonify({"message": "Proceso ETL ejecutado correctamente"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
