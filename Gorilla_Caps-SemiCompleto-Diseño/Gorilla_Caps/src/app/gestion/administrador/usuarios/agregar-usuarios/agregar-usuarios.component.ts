import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent {

  usuarioNuevo:UserInterface = {
    id: 0,
    name: '',
    email: '',
    password: '',
    active: true,
    confirmed_at: new Date(),
    admin : false,
    empleado : false,
    roles : []
  }

  constructor(private user:GorillaApiService, private router:Router) { }

  agregarUsuario(){
    this.user.addUser(this.usuarioNuevo).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>console.info()})
      console.log(this.usuarioNuevo);
      this.usuarioNuevo={
        id: 0,
        name: '',
        email: '',
        password: '',
        active: true,
        confirmed_at: new Date(),
        admin : false,
        empleado : false,
        roles : []
      }
      this.mostrarSweetAlert('Usuario agregado', 'El usuario se agregó correctamente', 'success');
      this.router.navigate(['Usuarios'])
 
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
