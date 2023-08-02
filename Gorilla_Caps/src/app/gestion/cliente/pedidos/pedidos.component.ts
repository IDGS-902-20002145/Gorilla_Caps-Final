import { Component } from '@angular/core';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Swal, { SweetAlertIcon } from 'sweetalert2';

type NewType = string;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
    editarCantidad: boolean = false;
    idUsuario: number = 0;
    listaPedidos: any = [];
    detallePedido: any = [];
    constructor(public pedido: GorillaApiService) { }

    ngOnInit(): void {
      this.idUsuario = Number(localStorage.getItem('id'));
      if (localStorage.getItem('token') == null) {
        window.location.href = "/Catalogo";
      }else{
      this.pedido.pedidosPorUsuario(this.idUsuario).subscribe(
        {
          next: response => {
            this.listaPedidos = response;
            console.log(this.listaPedidos);
          },
          error: error => console.log(error)
        }
      );
    }
  }
  getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    return './assets/default.jpg';
  }
  eliminarPedido(id: any) {
    this.pedido.eliminarPedido(id).subscribe(
      (data) => {
        this.mostrarSweetAlert('Pedido eliminado', 'El pedido se ha eliminado correctamente', 'warning');
        this.ngOnInit();
      },
      (error) => {
        console.error(error);
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
