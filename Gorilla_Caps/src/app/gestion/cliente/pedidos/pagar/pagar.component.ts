import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent {
  detallePedido: any;
  total: number = 0;
  idPedido: number = -1;



  constructor(private pagar: GorillaApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.detallePagar(this.idPedido);
  }


  detallePagar(id: number) {
    this.pagar.pagar(id).subscribe(
      (response: any) => {
        console.log(response);
        this.detallePedido = response.detallesProductos;
        this.total = response.total;
      },
      (error: any) => {
        console.error('Error al obtener los detalles del pedido', error);
      });
  }




}
