import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-a',
  templateUrl: './ventas-a.component.html',
  styleUrls: ['./ventas-a.component.css']
})
export class VentasAComponent implements OnInit {
  conteo_ventas_pendientes: number = 0;
  conteo_ventas_enviadas: number = 0;
  ventas_enviadas: any[] = [];
  ventas_pendientes: any[] = [];
  ventasPDisplay: string = 'none';
  ventasEDisplay: string = 'none';

  constructor(public ventasService: GorillaApiService, private router: Router) { }

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas() {
    this.ventasService.getAprovacion().subscribe(
      (response: any) => {
        console.log(response);
        this.conteo_ventas_pendientes = response.conteoVentasPendientes;
        this.conteo_ventas_enviadas = response.conteoVentasEnviadas;
        this.ventas_enviadas = response.ventasEnviadas;
        this.ventas_pendientes = response.ventasPendientes;
      },
      error => console.log(error)
    );
  }
  confirmarEnvio(idVenta: number) {
    this.ventasService.confirmarEnvio(idVenta).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Venta enviada',
          text: 'La venta se ha enviado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ngOnInit()
        this.regresarVentas();
      },
      error => console.log(error)
    );
  }
  detalleVenta(idVenta: number, estatus: string) {
    this.ventasService.getDetalleVenta(idVenta, estatus).subscribe(
      (response: any) => {
        console.log(response);
      },
      error => console.log(error)
    );
  }

  mostrarVentaE() {
    this.ventasEDisplay = 'block';
    this.ventasPDisplay = 'none';
  }

  mostrarVentasPE() {
    this.ventasPDisplay = 'block';
    this.ventasEDisplay = 'none';
  }

  regresarVentas() {
    this.ventasPDisplay = 'none';
    this.ventasEDisplay = 'none';
  }


  buscarPorFechaR() {

  }

}
