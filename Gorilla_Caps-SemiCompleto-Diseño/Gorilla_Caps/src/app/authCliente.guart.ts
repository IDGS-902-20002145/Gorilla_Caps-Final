import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthClienteGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
     const token = localStorage.getItem('token');
     const admin = localStorage.getItem('admin');
     const empleado = localStorage.getItem('empleado');

     if (token != null && (admin == 'false' && empleado == 'false')) {
        return true;
     } else if(token == null){
        return true;
     } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Esta sección es solo para clientes',
        });
        this.router.navigateByUrl('/Finanzas');
        return false;
     }
      }
    }
