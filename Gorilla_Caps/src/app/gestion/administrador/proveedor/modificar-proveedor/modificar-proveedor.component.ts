import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.css']
})
export class ModificarProveedorComponent {
  pswActual:string='';
  proveedorNuevo:ProveedorInterface = {
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
          this.proveedorNuevo=response;
          this.pswActual=response.password;
          console.log(this.proveedorNuevo);
        },
      )
    }
    modificarProveedor (){
      this.proveedor.updateProveedor(this.proveedorNuevo).subscribe(
        ()=>{
          console.log('Proveedor modificado exitosamente')
          this.mostrarSweetAlert('Proveedor modificado', 'El proveedor se modificó correctamente', 'success'),
          this.router.navigate(['Proveedor'])

        },
        (error)=>{
          console.error('Error al modificar el proveedor:',error)
          this.mostrarSweetAlert('Error', 'Error al modificar el proveedor', 'error')
        },
        ()=>console.info()
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
