import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ExplotacionmaterialInterface } from 'src/app/interfaces/explotacionmaterial.interface';
import { InventariomateriaprimaInterface } from 'src/app/interfaces/inventariomateriaprima.interface';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {
  nombre: string = "";
  descripcion: string = "";
  color: string = "";
  modelo: string = "";
  precio: number = 0;
  imagen: string = "";
  stock_existencia: number = 0;
  estatus: boolean = true;
  materiaPrima: InventariomateriaprimaInterface[] = [];
  materiaPrimaSeleccionada: { materiaPrima: InventariomateriaprimaInterface,cantidadIndividual: number, seleccionado?: boolean }[] = [];
  cantidadIndividual: number = 0;

  constructor(private gorilaApiService: GorillaApiService, private router: Router) { }

  ngOnInit() {
    // Obtener la lista de proveedores
    this.gorilaApiService.getMateriasPrimas().subscribe(
      (response) => {
        this.materiaPrima = response;
        // Inicializar la lista de materia prima seleccionada con valores predeterminados
        this.materiaPrimaSeleccionada = this.materiaPrima.map(material => ({
          materiaPrima: material,
          cantidadUsada: 0,
          cantidadIndividual: 0
        }));
      },
      (error) => {
        console.error('Error al obtener la lista de materiasPrimas:', error);
      }
    );
  }

  convertirImagenABase64(imagen: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async agregarProducto() {
    // Filtrar solo las materias primas seleccionadas
    const materiasPrimasSeleccionadas = this.materiaPrimaSeleccionada.filter(item => item.materiaPrima.id && item.cantidadIndividual > 0);

    // Crear un arreglo con los detalles de explotacion material para cada materia prima seleccionada
    const detallesExplotacionMaterial: ExplotacionmaterialInterface[] = materiasPrimasSeleccionadas.map(item => ({
      materialId: item.materiaPrima.id,
      cantidadIndividual: item.cantidadIndividual
    }));


    // Obtener la imagen seleccionada por el usuario
    const imagenSeleccionada = (document.getElementById('inputImagen') as HTMLInputElement)?.files?.[0];

    // Convertir la imagen a base64
    if (imagenSeleccionada) {
      try {
        this.imagen = await this.convertirImagenABase64(imagenSeleccionada);

        // Eliminar los primeros caracteres "data:image/jpeg;base64," de la cadena de la imagen en base64
        const dataPrefix = 'data:image/jpeg;base64,';
        if (this.imagen.startsWith(dataPrefix)) {
          this.imagen = this.imagen.slice(dataPrefix.length);
        }
      } catch (error) {
        console.error('Error al convertir la imagen a base64:', error);
        return;
      }
    }

    // Crear el objeto producto con los datos ingresados
    const producto: ProductoInterface = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      color: this.color,
      modelo: this.modelo,
      precio: this.precio,
      imagen: this.imagen,
      stock_existencia: this.stock_existencia,
      estatus: this.estatus,
      explotacion_material: detallesExplotacionMaterial
    };

    if (producto.nombre.trim() === '' || producto.descripcion.trim() === '' || producto.color.trim() === '' || producto.modelo.trim() === '' || producto.precio === 0 || producto.stock_existencia === 0) {
      this.mostrarSweetAlert('¡Error!', 'Todos los campos son obligatorios.', 'error');
      return;
    }
    else if (producto.precio < 0) {
      this.mostrarSweetAlert('¡Error!', 'El precio no puede ser menor a 0.', 'error');
      return;
    }
    else if (producto.stock_existencia < 0) {
      this.mostrarSweetAlert('¡Error!', 'El stock de existencia no puede ser menor a 0.', 'error');
      return;
    }
    else if (materiasPrimasSeleccionadas.length === 0) {
      this.mostrarSweetAlert('¡Error!', 'Selecciona al menos una materia prima.', 'error');
      return;
    }
    else if (materiasPrimasSeleccionadas.some(item => item.cantidadIndividual <= 0)) {
      this.mostrarSweetAlert('¡Error!', 'La cantidad de cada materia prima debe ser mayor a 0.', 'error');
      return;
    }
    else {
// Llamar al servicio para agregar el producto
this.gorilaApiService.addProducto(producto).subscribe(
  (resultado) => {
    console.log('Registro guardado', resultado);
    this.mostrarSweetAlert('¡Éxito!', 'Producto agregado exitosamente.', 'success');
    this.router.navigate(['productosGet']);
  },
  (error) => {
    console.log('Error al agregar el producto:', error);
    this.mostrarSweetAlert('¡Error!', 'Ocurrió un error al agregar el producto.', 'error');
  }
);
    }


  }
  actualizarCantidadUsada(materiaPrimaItem: { materiaPrima: InventariomateriaprimaInterface, cantidadUsada: number, cantidadIndividual: number }): void {
    materiaPrimaItem.cantidadUsada = materiaPrimaItem.cantidadIndividual * this.stock_existencia;
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
