# sql_connection.py
import pyodbc

def get_database_connection():
    connection_string = 'DRIVER={SQL Server};SERVER=DESKTOP-6K7EDGI\SQLEXPRESS;DATABASE=gorilla_caps;'
    return pyodbc.connect(connection_string)
