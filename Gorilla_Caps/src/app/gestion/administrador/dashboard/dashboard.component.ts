import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { MenuComponent } from 'src/app/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  start_date: string='';
  end_date: string='';
  ventasPorProductoData: any;
  @ViewChild('dashFrame') dashFrame: ElementRef | undefined;


  constructor(private http: HttpClient, private m: MenuComponent) {
    const today = new Date();
    this.start_date = '2023-05-01';
    this.end_date = this.formatDate(today);
  }

  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    // Construir el cuerpo de la solicitud con las fechas
    const requestBody = {
      start_date: this.start_date,
      end_date: this.end_date
    };

    this.http.post<any>('http://localhost:5001/run_etl', requestBody, { headers }).subscribe(
      response => {
        console.log('Proceso ETL ejecutado correctamente');
        this.dashFrame?.nativeElement.contentWindow.location.reload();
        setTimeout(() => {
          this.mostrarSweetAlertETL('¡Éxito!', 'Proceso ETL ejecutado correctamente.', 'success');
          this.m.reloadData();

        }, 4000);
      },
      error => {
        console.error('Error al ejecutar el proceso ETL:', error);
        this.mostrarSweetAlert('¡Error!', 'Error al ejecutar el proceso ETL.', 'error');
      }
    );

  }



  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  mostrarSweetAlert(title: string, text: string, icon: any): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok'
    });
  }

  mostrarSweetAlertETL(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      html: '<i class="fas fa-spinner fa-spin"></i> Dashboard en costrucción...',
      icon,
      showConfirmButton: false,
    });
  }
}
