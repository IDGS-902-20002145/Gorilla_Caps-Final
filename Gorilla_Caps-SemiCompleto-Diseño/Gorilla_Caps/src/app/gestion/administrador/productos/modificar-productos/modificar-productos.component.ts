import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrls: ['./modificar-productos.component.css']
})
export class ModificarProductosComponent implements OnInit {
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

  nuevaImagen: File | undefined;

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

  cargarImagen(event: any): void {
    this.nuevaImagen = event.target.files[0];
  }

  async actualizarProducto() {
    if (this.nuevaImagen) {
      try {
        const imagenBase64 = await this.convertirImagenABase64(this.nuevaImagen);

        // Eliminar los primeros caracteres "data:image/jpeg;base64," de la cadena de la imagen en base64
        const dataPrefix = 'data:image/jpeg;base64,';
        if (imagenBase64.startsWith(dataPrefix)) {
          this.producto.imagen = imagenBase64.slice(dataPrefix.length);
        }
      } catch (error) {
        console.error('Error al convertir la imagen a base64:', error);
        return;
      }
    }

    this.gorilaApiService.modificarProducto(this.producto).subscribe(
      (response) => {
        console.log('Producto actualizado:', response);
        this.mostrarSweetAlert('Producto actualizado', 'El producto se ha actualizado correctamente', 'success');
        this.router.navigate(['productosGet']);
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
        this.mostrarSweetAlert('Error', 'Ha ocurrido un error al actualizar el producto', 'error');
      }
    );
  }

  getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    // Puedes establecer una imagen de relleno en caso de que no haya imagen
    return './assets/default.jpg';
  }

  convertirImagenABase64(imagen: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
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
