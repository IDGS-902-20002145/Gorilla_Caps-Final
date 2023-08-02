import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent implements OnInit{
  nuevoStock: number=0;
  producto: ProductoInterface={ id: 0, nombre: '', descripcion: '', color: '', modelo: '', precio: 0, imagen: '', stock_existencia: 0, estatus: true };
  

  constructor(
    private route: ActivatedRoute,
    private productApiService: GorillaApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductoPorId();
  }

  obtenerProductoPorId(): void {
    const id = this.route.snapshot.params['id'];
    this.productApiService.obtenerProductoPorId(id).subscribe(
      (producto: ProductoInterface) => {
        this.producto = producto;
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  actualizarStock() {
    const id = this.route.snapshot.params['id'];
    this.productApiService.addStockProducto(id, this.nuevoStock).subscribe(
      (response) => {
        console.log('Stock actualizado:', response);
        // Lógica adicional luego de actualizar el stock
        this.mostrarSweetAlert(
          'Stock actualizado',
          'El stock se ha actualizado correctamente',
          'success'
        );
        this.router.navigate(['productosGet']);

      },
      (error) => {
        console.error('Error al actualizar el stock:', error);
        this.mostrarSweetAlert(
          'Error',
          'Ha ocurrido un error al actualizar el stock',
          'error'
        );
        // Manejo de errores
      }
    );
  }

   // Método para convertir la imagen Base64 a un objeto URL
   getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    // Puedes establecer una imagen de relleno en caso de que no haya imagen
    return './assets/default.jpg';
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
