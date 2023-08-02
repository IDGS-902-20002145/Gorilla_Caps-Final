import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { Compra } from 'src/app/interfaces/compra.interface';
import { DetalleCompra } from 'src/app/interfaces/detcompra.interface';
import { InventariomateriaprimaInterface } from 'src/app/interfaces/inventariomateriaprima.interface';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.component.html',
  styleUrls: ['./registro-compras.component.css']
})
export class RegistroComprasComponent implements OnInit {
  proveedorId: number = 0;
  materialId: number = 0;
  cantidad: number = 0;
  precio: number  = 0;
  material: InventariomateriaprimaInterface = { id: 0, nombre: '', descripcion: '', cantidad: 0, stock_Minimo: 0, estatus: false }; // Inicializar con un valor predeterminado
  proveedores: ProveedorInterface[] = []; // Lista de proveedores

  constructor(
    private route: ActivatedRoute,
    private compraService: GorillaApiService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener la lista de proveedores
    this.compraService.getProveedores().subscribe(
      (response) => {
        this.proveedores = response;
      },
      (error) => {
        console.error('Error al obtener la lista de proveedores:', error);
      }
    );

    // Obtener el ID del material desde la URL
    this.route.params.subscribe(params => {
      this.materialId = +params['materialId']; // Convertir el ID de string a number
      // Obtener los detalles del material desde la API
      this.compraService.getMateriasPrimasById(this.materialId).subscribe(
        (response) => {
          this.material = response; // Almacenar los detalles del material en la variable
        },
        (error) => {
          console.error('Error al obtener los detalles del material:', error);
        }
      );
    });
  }


  registrarCompra() {
    const detalle: DetalleCompra = {
      MaterialId: this.materialId,
      Cantidad: this.cantidad,
      Precio: this.precio
    };

    const compra: Compra = {
      ProveedorId: this.proveedorId,
      DetCompra: [detalle]
    };

    this.compraService.registrarCompra(compra).subscribe(
      (response) => {
        console.log('Compra registrada:', response);
        // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página.
        this.mostrarSweetAlert('¡Éxito!', 'La compra esta por confirmarse', 'success');
        this.router.navigate(['MateriasPrimas'])

      },
      (error) => {
        console.error('Error al registrar la compra:', error);
        // Aquí puedes mostrar un mensaje de error.
        this.mostrarSweetAlert('¡Error!', 'Ocurrio un error inesperado', 'error');

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
