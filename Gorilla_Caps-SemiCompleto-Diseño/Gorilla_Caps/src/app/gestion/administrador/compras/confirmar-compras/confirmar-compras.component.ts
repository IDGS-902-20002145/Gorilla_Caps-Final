import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CompraGET } from 'src/app/interfaces/compraGET.interface';

@Component({
  selector: 'app-confirmar-compras',
  templateUrl: './confirmar-compras.component.html',
  styleUrls: ['./confirmar-compras.component.css']
})
export class ConfirmarComprasComponent {
  compraId: number;
  compra: CompraGET = {
    id: 0,
    fecha: new Date(),
    proveedor: { id: 0, nombre: '', email: '', telefono: '', direccion: '', active: false },
    total: 0,
    estatus: false,
    detCompra: []
  };
  compraConfirmada: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private compraService: GorillaApiService,
    private router: Router
  ) {
    // Obtener el ID de la compra desde la URL
    this.compraId = parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10);
  }

  confirmarCompra() {
    // Formar el JSON con el ID de la compra
    const data = { id: this.compraId };

    // Llamar a la función del servicio para confirmar la compra
    this.compraService.confirmarCompra(data).subscribe(
      (response: CompraGET) => {
        console.log('Compra confirmada:', response);
        // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página.
        this.mostrarSweetAlert('Compra confirmada', 'La compra se confirmó correctamente', 'success');
        this.router.navigate(['MateriasPrimas']);
        this.compraConfirmada = true;
        this.compra = response;
      },
      (error) => {
        console.error('Error al confirmar la compra:', error);
        // Aquí puedes mostrar un mensaje de error.
        this.mostrarSweetAlert('Error', 'Ocurrió un error al confirmar la compra', 'error');
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
