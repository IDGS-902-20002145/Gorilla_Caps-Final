import { Component, ElementRef, ViewChild } from '@angular/core';
import { GorillaApiService } from '../../gorilla-api.service';
import { ProductoInterface } from '../../interfaces/producto.interface';
import { FullPedidoInterface } from '../../interfaces/fullPedido.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/carrito.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {


  private scrollInterval: any;
  private container: any;
  listFilter:string='';
  products: ProductoInterface[] = [];
  fullPedido?: FullPedidoInterface;
  productosEnCarrito:boolean = false;

  prod: ProductoInterface = {
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
  constructor(private productService: GorillaApiService, private elRef: ElementRef, public router:Router,
    public carritoS:CarritoService) { }

  ngOnInit() {
    this.loadProducts();
    if(this.carritoS.obtenerCarritoTemporal().length > 0){
      this.productosEnCarrito = true;
      //Establecemos un timeout y volemos a poner productosEnCarrito en false para que no se muestre el mensaje
      setTimeout(() => {
        this.productosEnCarrito = false;
      }, 4000);
    }
  }

  loadProducts() {
    this.productService.getProductos().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error(error);
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
  agregarC(id: any) {
    if(localStorage.getItem('id') != null){
      let idUsuario = Number(localStorage.getItem('id'));

    this.productService.findProducto(id).subscribe(
      (data) => {
        this.prod = data;
        console.log(this.prod);
        this.fullPedido = {
          id: 0,
          UserId: idUsuario,
          fecha: new Date(),
          cantidad: 1,
          estatus: 1,
          producto: this.prod
        };

        console.log(this.fullPedido);

        this.productService.agregarCarrito(id, this.fullPedido).subscribe(
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
    }else{
      this.mostrarSweetAlert('Error', 'Inicia sesión para agregar productos al carrito', 'error');
      this.router.navigate(['/Login']);
    }

  }

  agregarCTemporal(id: any, cantidad: any) {
    if(localStorage.getItem('id') != null){
      let idUsuario = Number(localStorage.getItem('id'));

    this.productService.findProducto(id).subscribe(
      (data) => {
        this.prod = data;
        console.log(this.prod);
        this.fullPedido = {
          id: 0,
          UserId: idUsuario,
          fecha: new Date(),
          cantidad: cantidad,
          estatus: 1,
          producto: this.prod
        };

        console.log(this.fullPedido);

        this.productService.agregarCarrito(id, this.fullPedido).subscribe(
          (data) => {
            console.log(data);
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

  }

    mostrarSweetAlert(title: string, text: string, icon: SweetAlertIcon): void {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Ok'
      });
    }

    startScroll() {
      this.container = this.elRef.nativeElement.querySelector('.product-list-cards');
      this.scrollInterval = setInterval(() => {
        this.container.scrollLeft += 5; // Ajusta la velocidad del scroll aquí (por ejemplo, 2 para lento, 10 para rápido)
      }, 10); // Ajusta el intervalo aquí (por ejemplo, 10 para lento, 1 para rápido)
    }

    stopScroll() {
      clearInterval(this.scrollInterval);
      this.container.scrollLeft = 0;
    }

    isCartOpen: boolean = false;

    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    }
    agregarCarritoTemporal(id: any) {
      //Primero obtenemos el producto
      let prodTemp: ProductoInterface;
      this.productService.findProducto(id).subscribe(
        (data) => {
          prodTemp = data;
          this.carritoS.agregarProductoAlCarrito(prodTemp);
          this.carritoS.obtenerCarritoTemporal();
        },
        (error) => {
          this.mostrarSweetAlert('Error', 'No se pudo agregar el producto al carrito', 'error');
        });

      }

  esAdminOEmpleado():boolean{
   if(localStorage.getItem('admin') == 'true' || localStorage.getItem('empleado') == 'true'){
     return false;
    }else{
     return true;
    }
  }
}
