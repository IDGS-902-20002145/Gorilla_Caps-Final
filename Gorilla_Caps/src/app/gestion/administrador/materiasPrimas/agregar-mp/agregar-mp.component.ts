import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { InventariomateriaprimaInterface } from 'src/app/interfaces/inventariomateriaprima.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-agregar-mp',
  templateUrl: './agregar-mp.component.html',
  styleUrls: ['./agregar-mp.component.css']
})
export class AgregarMPComponent {

  regMateriaPrima: InventariomateriaprimaInterface ={
    id: 0,
    nombre: '',
    descripcion: '',
    cantidad: 0,
    stock_Minimo: 0,
    estatus: true
  }

  constructor(private gorillaApiService: GorillaApiService, private router: Router) {}

  agregarMateriaPrima() {
    if (this.regMateriaPrima.nombre.trim() === '' || this.regMateriaPrima.descripcion.trim() === '' || this.regMateriaPrima.stock_Minimo === 0) {
      this.mostrarSweetAlert('¡Error!', 'Todos los campos son obligatorios.', 'error');
      return;
    }
    else if (this.regMateriaPrima.stock_Minimo<0 && this.regMateriaPrima.stock_Minimo==0){
      this.mostrarSweetAlert('¡Error!', 'El stock mínimo no puede ser menor a 0.', 'error');
      return;
    }
    else {
      this.gorillaApiService.addMateriasPrimas(this.regMateriaPrima).subscribe({
        next: () => console.log(),
        error: (e) => console.error(e),
        complete: () => console.info()
      })
    }




    this.regMateriaPrima = {
    id: 0,
    nombre: '',
    descripcion: '',
    cantidad: 0,
    stock_Minimo: 0,
    estatus: true
    }
    this.mostrarSweetAlert('¡Éxito!', 'Material agregado exitosamente.', 'success');
    this.router.navigate(['MateriasPrimas'])

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
