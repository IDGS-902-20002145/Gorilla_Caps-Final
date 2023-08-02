import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { FullPedidoInterface } from 'src/app/interfaces/fullPedido.interface';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent {

  producto!: ProductoInterface;
  productosRelacionados: ProductoInterface[] = [];
  cantidad: number = 1;
  maximo: number = 1;
  fullPedido?: FullPedidoInterface;
  
  prodPed: ProductoInterface = {
    id: 0 ,
    nombre: '',
    descripcion: '',
    color: '',
    modelo: '',
    precio: 0,
    imagen: '',
    stock_existencia: 0,
    estatus: true,
    explotacion_material: []
  };

  constructor(public prod:GorillaApiService, public router:Router) { }

  ngOnInit(): void {
    let productoId = this.router.url.split('/')[3];
    this.prod.findProducto(Number(productoId)).subscribe(
      (data) => {
        this.producto = data;
        this.maximo = this.producto.stock_existencia;
        this.productosRF();
        console.log(this.producto);
      },
      (error) => {
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

  getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    // Puedes establecer una imagen de relleno en caso de que no haya imagen
    return './assets/default.jpg';
  }

  increment() {
    if (this.cantidad < this.maximo){
    this.cantidad++;
    }
  }

  decrement() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarC(id: any) {
    let idUsuario = Number(localStorage.getItem('id'));
  
    this.prod.findProducto(id).subscribe(
      (data) => {
        this.prodPed = data;
        console.log(this.prod);
        this.fullPedido = {
          id: 0,
          UserId: idUsuario,
          fecha: new Date(),
          cantidad: this.cantidad,
          estatus: true,
          producto: this.prodPed
        };
  
        console.log(this.fullPedido);
        
        this.prod.agregarCarrito(id, this.fullPedido).subscribe(
          (data) => {
            console.log(data);
            this.mostrarSweetAlert('Producto agregado', 'El producto se agregó al carrito', 'success');
            this.router.navigate(['/Catalogo']);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  productosRF():void {
    this.prod.getProductos().subscribe(
      (data) => {
        //Hacemos un for para recorrer los productos y encontrar los que tengan el mismo modelo
        for (let i = 0; i < data.length; i++) {
          if (data[i].modelo == this.producto.modelo) {
            this.productosRelacionados.push(data[i]);
          }
        }
        console.log(this.productosRelacionados);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  redireccionarProducto(id: any) {
    this.router.navigateByUrl(`/Catalogo/ProductoDetalle/${id}`);
  }
}
