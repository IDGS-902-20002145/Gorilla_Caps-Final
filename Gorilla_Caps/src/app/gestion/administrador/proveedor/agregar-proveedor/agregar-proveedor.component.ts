import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {
  proveedorNuevo:ProveedorInterface = {
    id: 0,
    nombre: ' ',
    email: ' ',
    telefono: ' ',
    direccion: ' ',
    active: true,
  }

  constructor(private proveedor:GorillaApiService, private router:Router) { }

  // agregarProveedor(){
  //   this.proveedor.addProveedor(this.proveedorNuevo).subscribe({
  //     next:()=>console.log(),
  //     error:(e)=> console.error(e),
  //     complete:()=>console.info()})
  //     console.log(this.proveedorNuevo);
  //     this.proveedorNuevo={
  //       id: 0,
  //       nombre: ' ',
  //       email: ' ',
  //       telefono: ' ',
  //       direccion: ' ',
  //       active: true,
  //     }
  //     this.mostrarSweetAlert('Proveedor agregado', 'El proveedor se agregó correctamente', 'success');
  //     this.router.navigate(['Proveedor'])
 
  // }

  agregarProveedor() {
    // Verificar si alguno de los campos está vacío
    if (
      this.proveedorNuevo.nombre.trim() === '' ||
      this.proveedorNuevo.email.trim() === '' 
    ) {
      // Mostrar un mensaje de error si algún campo está vacío
      this.mostrarSweetAlert('Error', 'Por favor, complete todos los campos', 'error');
      return; // Salir de la función si algún campo está vacío
    }
  
    // Llamar al servicio para agregar el proveedor
    this.proveedor.addProveedor(this.proveedorNuevo).subscribe({
      next: () => console.log(),
      error: (e) => console.error(e),
      complete: () => console.info(),
    });
  
    // Limpiar los campos después de agregar el proveedor
    this.proveedorNuevo = {
      id: 0,
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      active: true,
    };
  
    // Mostrar un mensaje de éxito
    this.mostrarSweetAlert('Proveedor agregado', 'El proveedor se agregó correctamente', 'success');
  
    // Navegar a la ruta 'Proveedor'
    this.router.navigate(['Proveedor']);
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
