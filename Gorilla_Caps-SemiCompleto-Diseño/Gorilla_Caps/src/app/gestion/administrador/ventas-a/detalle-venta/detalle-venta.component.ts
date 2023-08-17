import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  detalle_ventas: any[] = []; // Add this variable to store the data
  idVenta: number = 0;
  estatus: boolean =  false; // Cambiar el tipo de dato a boolean
  st: string = ''; // Add this variable to store the data


  constructor(private detalleVentasService: GorillaApiService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idVenta = Number(params['idVenta']);
      this.st = params['estatus'];
      this.estatus = this.st == 'true' ? true : false;
      console.log(this.idVenta);
      console.log(this.estatus);
    });
    this.getDetalleVenta(this.idVenta, this.estatus);
  }

  getDetalleVenta(idVenta: number, estatus: boolean) {
    this.detalleVentasService.getDetalleVenta(idVenta, estatus.toString()).subscribe(
      (response: any) => {
        console.log(response);
        this.detalle_ventas = response;
        console.log(estatus);
      },
      error => console.log(error)
    );
  }

  confirmarEnvio() {
    this.detalleVentasService.confirmarEnvio(this.idVenta).subscribe(
      (response: any) => {

        Swal.fire({
          title: 'Venta enviada',
          text: 'La venta se ha enviado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.estatus = true;

        this.router.navigate(['/Aprovacion']);
      },
      error => console.log(error)
    );
  }
}
