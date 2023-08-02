import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              public user:GorillaApiService,
              private router:Router,
              private aService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.user.findBy_UsernamePassword(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response: any) => {
        if(response.user){
        this.aService.setToken(response.token);
        this.aService.setID(response.user.id);
        this.mostrarSweetAlert('Bienvenido', 'Has iniciado sesión correctamente', 'success');
        this.router.navigate(['/Proveedor']);
        }else{
          this.mostrarSweetAlert('Error', 'Usuario o contraseña incorrectos', 'error');
        }

      },
      (error: any) => {
        // Manejo de errores en caso de que la solicitud falle.
        this.mostrarSweetAlert('Error', 'Usuario o contraseña incorrectos', 'error');
        console.error(error);
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
