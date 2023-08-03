import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardEmp implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    const empleado = localStorage.getItem('empleado');
    if (isAuthenticated != null && admin == 'true' || isAuthenticated != null && empleado == 'true') {
      return true; // Permite la activación de la ruta
    } else {
      // Si el usuario no está autenticado, redirige a la página de autenticación
      Swal.fire({
        title: 'Error',
        text: 'No tienes permiso para acceder a esta página',
        icon: 'error',
        confirmButtonText: 'Aceptar'
        });
      this.router.navigate(['/Login']);
      return false; 
    }
  }
}