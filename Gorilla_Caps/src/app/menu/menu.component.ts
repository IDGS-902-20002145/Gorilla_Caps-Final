import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from '../gorilla-api.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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

  constructor(public router: Router, public gas: GorillaApiService) { }

  ngOnInit(): void {

    this.verificarToken();
    this.obtenerUsuario();
  }

  verificarToken(): void {
    if (localStorage.getItem('token')) {
      this.ltoken = true;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.mostrarSweetAlert('Sesión cerrada', 'Has cerrado sesión correctamente', 'success');
    this.router.navigate(['Catalogo']);
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

  mostrarSweetAlert(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok'
    });
  }
}
