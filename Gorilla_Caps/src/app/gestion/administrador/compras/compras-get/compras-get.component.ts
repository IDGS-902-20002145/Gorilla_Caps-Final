import { Component } from '@angular/core';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { CompraGET } from 'src/app/interfaces/compraGET.interface';

@Component({
  selector: 'app-compras-get',
  templateUrl: './compras-get.component.html',
  styleUrls: ['./compras-get.component.css']
})
export class ComprasGETComponent {
  comprasConfirmadas: CompraGET[] = [];
  comprasNoConfirmadas: CompraGET[] = [];
  comprasConfirmadasActivas: boolean = true;
  comprasNoConfirmadasActivas: boolean = false;

  constructor(private compraService: GorillaApiService) {}

  ngOnInit() {
    this.getComprasConfirmadas();
    this.getComprasNoConfirmadas();
  }

  getComprasConfirmadas() {
    this.compraService.comprasRealizadas().subscribe(
      (compras) => {
        this.comprasConfirmadas = compras;
      },
      (error) => {
        console.error('Error al obtener las compras confirmadas:', error);
      }
    );
  }

  getComprasNoConfirmadas() {
    this.compraService.comprasNoConfirmadas().subscribe(
      (compras) => {
        this.comprasNoConfirmadas = compras;
      },
      (error) => {
        console.error('Error al obtener las compras no confirmadas:', error);
      }
    );
  }

  mostrarComprasConfirmadas() {
    this.comprasConfirmadasActivas = true;
    this.comprasNoConfirmadasActivas = false;
  }

  mostrarComprasNoConfirmadas() {
    this.comprasConfirmadasActivas = false;
    this.comprasNoConfirmadasActivas = true;
  }
}
