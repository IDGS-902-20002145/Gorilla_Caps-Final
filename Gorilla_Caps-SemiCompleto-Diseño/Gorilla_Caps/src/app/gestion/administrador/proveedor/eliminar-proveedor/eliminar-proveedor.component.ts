import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-eliminar-proveedor',
  templateUrl: './eliminar-proveedor.component.html',
  styleUrls: ['./eliminar-proveedor.component.css']
})
export class EliminarProveedorComponent {

  proveedorElim:ProveedorInterface = {
    id: 0,
    nombre: ' ',
    email: ' ',
    telefono: ' ',
    direccion: ' ',
    active: true,
  }
  constructor(private proveedor:GorillaApiService, private router:Router) { }


    ngOnInit(): void {
      const id = this.router.url.split('/')[2];

      this.proveedor.findProveedor(+id!).subscribe(
        (response: any)=>{
          this.proveedorElim=response;
          console.log(this.proveedorElim);
        },
      )
    }

    eliminarProveedor(){
      this.proveedorElim.active=false;
      this.proveedor.updateProveedor(this.proveedorElim).subscribe(
        () => {
          this.mostrarSweetAlert('Advertencia', 'Proveedor eliminado exitosamente.', 'warning');
          this.router.navigate(['/Proveedor']);
        },
        (error) => {
          this.mostrarSweetAlert('¡Error!', 'Error al eliminar el proveedor.', 'error');
          console.error('Error al eliminar el proveedor:', error);
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
