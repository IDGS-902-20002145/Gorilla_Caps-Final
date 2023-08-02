import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-eliminar-productos',
  templateUrl: './eliminar-productos.component.html',
  styleUrls: ['./eliminar-productos.component.css']
})
export class EliminarProductosComponent {
  producto: ProductoInterface = {
    id: 0,
    nombre: '',
    descripcion: '',
    color: '',
    modelo: '',
    precio: 0,
    imagen: '',
    stock_existencia: 0,
    estatus: true
  };

  constructor(private gorilaApiService: GorillaApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerProductoPorId();
  }

  obtenerProductoPorId(): void {
    const id = this.route.snapshot.params['id'];
    this.gorilaApiService.obtenerProductoPorId(id).subscribe(
      (producto: ProductoInterface) => {
        this.producto = producto;
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  eliminarProducto(): void {
    if (this.producto.id) { // Verificar que el ID no sea undefined
      this.gorilaApiService.deleteProducto(this.producto.id).subscribe(
        (response) => {
          console.log('Producto eliminado:', response);
          this.mostrarSweetAlert('Producto eliminado', 'El producto se ha eliminado correctamente', 'success');
          this.router.navigate(['productosGet']);
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
          this.mostrarSweetAlert('Error', 'Ha ocurrido un error al eliminar el producto', 'error');
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
  getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    // Puedes establecer una imagen de relleno en caso de que no haya imagen
    return './assets/default.jpg';
  }
}
