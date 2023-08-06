import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from '../gorilla-api.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { local } from 'd3-selection';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  ltoken: boolean = false;
  nUsuario: string = '';
  empleado: boolean = false;
  admin: boolean = false;
  id: number = Number(localStorage.getItem('id'));

  constructor(public router: Router, public gas: GorillaApiService) {
   }

  ngOnInit(): void {
    this.verificarToken();
    this.obtenerUsuario();
  }

  reloadData() {
    window.location.reload();
    }

  verificarToken(): void {
    if (localStorage.getItem('token')) {
      this.ltoken = true;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('admin');
    localStorage.removeItem('empleado');
    this.router.navigate(['Catalogo']);
    this.showLogoutAlert();
  }

  obtenerUsuario(): void {
    if (localStorage.getItem('token')) {
      this.gas.findUser(this.id).subscribe(
        (data) => {
          console.log(data);
          this.nUsuario = data.name;
          this.empleado = data.empleado;
          this.admin = data.admin;
          console.log(this.admin);
        }
      );
    }
  }

// Función para mostrar la alerta de logout con animación
  showLogoutAlert():void {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión cerrada',
          text: '¡Hasta pronto!',
          html: '<i class="fas fa-check-circle"></i>',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        }).finally(() => {
          this.reloadData();
        });

      }
    });
  }




}
