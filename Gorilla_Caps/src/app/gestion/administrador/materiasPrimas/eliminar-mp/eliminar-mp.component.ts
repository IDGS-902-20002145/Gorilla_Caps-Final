import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { InventariomateriaprimaInterface } from 'src/app/interfaces/inventariomateriaprima.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-eliminar-mp',
  templateUrl: './eliminar-mp.component.html',
  styleUrls: ['./eliminar-mp.component.css']
})
export class EliminarMPComponent {
  ediMateriaPrima: InventariomateriaprimaInterface ={
    id: 0,
    nombre: '',
    descripcion: '',
    cantidad: 0,
    stock_Minimo: 0,
    estatus: true,
    unidad_Medida: ''
  }

  constructor(private gorillaApiService: GorillaApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.obtenerMaterial(id);
      console.log("___________________-"+this.ediMateriaPrima.stock_Minimo); // Verificar el valor del stock mínimo
    });
  }

  eliminar() {
    this.gorillaApiService.deleteMateriasPrimas(this.ediMateriaPrima.id).subscribe(
      () => {
        console.log('Material eliminado exitosamente');
        this.mostrarSweetAlert('¡Éxito!', 'Material eliminado exitosamente.', 'success');
        this.router.navigate(['MateriasPrimas']);
      },
      (error) => {
        this.mostrarSweetAlert('¡Error!', 'Error al eliminar el material.', 'error');
        console.error('Error al eliminar el material:', error);
      }
    );
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
