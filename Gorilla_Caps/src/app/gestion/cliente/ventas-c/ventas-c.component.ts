import { Component, OnInit } from '@angular/core';
import { GorillaApiService } from 'src/app/gorilla-api.service';

@Component({
  selector: 'app-ventas-c',
  templateUrl: './ventas-c.component.html',
  styleUrls: ['./ventas-c.component.css']
})
export class VentasCComponent implements OnInit {
  ventasPorAprobar: any[] = [];
  ventasAprobadas: any[] = [];
  mostrarPendientes: boolean = true;
  mostrarEnCamino: boolean = false;
    // Función para obtener las claves de un objeto
    getObjectKeys(obj: any): string[] {
      return obj ? Object.keys(obj) : [];
    }

  constructor(private ventasService: GorillaApiService) { }

  ngOnInit(): void {
    this.getCompras();
  }

  getCompras() {
    this.ventasService.getMisCompras().subscribe(
      (response: any) => {
        console.log(response); // Verificar la respuesta en la consola
        console.log(response.ventasPA);
        console.log(response.ventasA);
        if (response) {
          this.ventasPorAprobar = response.ventasPA || [];
          this.ventasAprobadas = response.ventasA || [];
          console.log(this.ventasPorAprobar);
          console.log(this.ventasAprobadas);
        } else {
          this.ventasPorAprobar = [];
          this.ventasAprobadas = [];
        }
      },
      error => console.log(error)
    );
  }

  cambiarVista(vista: string) {
    if (vista === 'pendientes') {
      this.mostrarPendientes = true;
      this.mostrarEnCamino = false;
    } else {
      this.mostrarPendientes = false;
      this.mostrarEnCamino = true;
    }
  }
}
