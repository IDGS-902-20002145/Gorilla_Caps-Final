import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { InventariomateriaprimaInterface } from 'src/app/interfaces/inventariomateriaprima.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-editar-mp',
  templateUrl: './editar-mp.component.html',
  styleUrls: ['./editar-mp.component.css']
})
export class EditarMPComponent {
  ediMateriaPrima: InventariomateriaprimaInterface ={
    id: 0,
    nombre: '',
    descripcion: '',
    cantidad: 0,
    stock_Minimo: 0,
    estatus: true
  }

  constructor(private gorillaApiService: GorillaApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.obtenerMaterial(id);
      console.log("___________________-"+this.ediMateriaPrima.stock_Minimo); // Verificar el valor del stock mínimo
    });
  }

  editar() {
    if (this.ediMateriaPrima.nombre.trim() === '' || this.ediMateriaPrima.descripcion.trim() === '' || this.ediMateriaPrima.stock_Minimo === 0) {
      this.mostrarSweetAlert('¡Error!', 'Todos los campos son obligatorios.', 'error');
      return;
    }
    else if (this.ediMateriaPrima.stock_Minimo<0){
      this.mostrarSweetAlert('¡Error!', 'El stock mínimo no puede ser menor a 0.', 'error');
      return;
    }
    else{
      this.gorillaApiService.modifyMateriasPrimas(this.ediMateriaPrima).subscribe(
        () => {
          console.log('Material editado exitosamente');
          this.mostrarSweetAlert('¡Éxito!', 'Material editado exitosamente.', 'success');
          this.router.navigate(['MateriasPrimas']);
        },
        (error) => {
          this.mostrarSweetAlert('¡Error!', 'Error al editar el material.', 'error');
          console.error('Error al editar el material:', error);
        }
      );
    }

  }
  obtenerMaterial(id: number) {
    this.gorillaApiService.getMateriasPrimasById(id).subscribe({
      next: (material) => {
        this.ediMateriaPrima = material;
        console.log("********************"+material); // Verificar el valor del stock mínimo
      },
      error: (e) => console.error(e),
      complete: () => console.info()
    });
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
