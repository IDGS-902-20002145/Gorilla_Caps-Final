import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  ngOnInit() {
    // Coloca aquí el código que deseas ejecutar cuando ingresas al módulo del dashboard
    this.onDatesSelected();
  }
  fechaInicio: string;
  fechaFin: string;
  ventasPorProductoData: any;

  constructor(private http: HttpClient) {
    // Inicializar las fechas con valores predeterminados
    const today = new Date();
    this.fechaInicio = this.formatDate(today);
    this.fechaFin = this.formatDate(today);
  }


  onSubmit() {
    // Construir la URL con los query parameters para enviar al servidor Dash
    const url = `http://localhost:8050/dashboard?fecha_inicio=${this.fechaInicio}&fecha_fin=${this.fechaFin}`;

    // Realizar la solicitud HTTP al servidor Dash
    this.http.get<any>(url).subscribe(
      (data) => {
        // Actualizar los datos del gráfico con la respuesta del servidor
        this.ventasPorProductoData = data;
      },
      (error) => {
        console.error('Error al obtener los datos del servidor Dash:', error);
      }
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  onDatesSelected() {

    // Enviar las fechas al backend para ejecutar el ETL


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    this.http.post<any>('http://localhost:5001/run_etl', { headers }).subscribe(
      response => {
        console.log('Proceso ETL ejecutado correctamente');
        this.mostrarSweetAlert('¡Éxito!', 'Proceso ETL ejecutado correctamente.', 'success');

        // Una vez que el ETL se ha ejecutado, muestra el dashboard
      },
      error => {
        console.error('Error al ejecutar el proceso ETL:', error);
        this.mostrarSweetAlert('¡Error!', 'Error al ejecutar el proceso ETL.', 'error');
      }
    );
  }

  mostrarSweetAlert(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok'
    });
  }
}
