import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  verificarPassword: string = '';

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

  verificarCont():void{
    if(this.usuarioNuevo.password != this.verificarPassword){
      this.mostrarSweetAlert('Error', 'Las contraseñas no coinciden', 'error');
    }else{
      this.agregarUsuario();
    }
  }


  agregarUsuario(){
    if(!this.verificarVacios()){
    this.user.loginRegister(this.usuarioNuevo).subscribe({
      next:()=>console.log('Usuario registrado'),
      error:(e)=> console.error(e),
      complete:()=>console.info()})
      console.log(this.usuarioNuevo);
      this.mostrarSweetAlert('Te has registrado correctamente',
                                       'Bienvenido'+ this.usuarioNuevo.name+' a GorillaCaps',
                                       'success'),

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
      
      
      this.router.navigate(['/Login'])
    }else{
      this.mostrarSweetAlert('Error', 'No puede haber campos vacios', 'error');
    }
 
  }

  mostrarSweetAlert(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok'
    });
  }

  verificarVacios():boolean{
    if(this.usuarioNuevo.name == '' || this.usuarioNuevo.email == '' || this.usuarioNuevo.password == ''){
      return true;
    }else{
      return false;
    }
  }
}
