import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css']
})
export class ModificarUsuariosComponent {
  pswActual:string='';
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

    //Funcion para poner los datos en el formulario
    ngOnInit(): void {
      const id = this.router.url.split('/')[2];
      
      this.user.findUser(+id!).subscribe({
        next: (response: any)=>{
          this.usuarioNuevo=response;
          this.pswActual=response.password;
          console.log(this.usuarioNuevo);
        },
        error:(e: any)=> console.error(e),
        complete:()=>console.info()})
    }
    modificarUsuario (){
      if(this.usuarioNuevo.password==this.pswActual){
        this.usuarioNuevo.password='';
      }
      this.user.updateUser(this.usuarioNuevo).subscribe(
        ()=>{
          console.log('Usuario modificado exitosamente')
          this.mostrarSweetAlert('Usuario modificado', 'El usuario se modificó correctamente', 'success'),
          this.router.navigate(['Usuarios'])

        },
        (error)=>{
          console.error('Error al modificar el usuario:',error)
          this.mostrarSweetAlert('Error', 'Error al modificar el usuario', 'error')
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
