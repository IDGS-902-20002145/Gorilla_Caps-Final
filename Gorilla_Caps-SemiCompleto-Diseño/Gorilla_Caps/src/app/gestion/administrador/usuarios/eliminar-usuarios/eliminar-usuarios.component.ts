import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-eliminar-usuarios',
  templateUrl: './eliminar-usuarios.component.html',
  styleUrls: ['./eliminar-usuarios.component.css']
})
export class EliminarUsuariosComponent {

  usuarioElim:UserInterface = {
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

  ngOnInit(): void {
    const id = this.router.url.split('/')[2];
    
    this.user.findUser(+id!).subscribe({
      next: (response: any)=>{
        this.usuarioElim=response;
        console.log(this.usuarioElim);
      },
      error:(e: any)=> console.error(e),
      complete:()=>console.info()})
  }

  eliminarUsuario(){
    this.usuarioElim.active=false;
    this.user.updateUser(this.usuarioElim).subscribe(
      () => {
        this.mostrarSweetAlert('Advertencia', 'Usuario eliminado exitosamente.', 'warning');
        this.router.navigate(['Usuarios']);
      },
      (error) => {
        this.mostrarSweetAlert('¡Error!', 'Error al eliminar el usuario.', 'error');
        console.error('Error al eliminar el usuario:', error);
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
