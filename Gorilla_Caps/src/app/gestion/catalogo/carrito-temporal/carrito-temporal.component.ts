import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/carrito.service';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { PedidosComponent } from '../../cliente/pedidos/pedidos.component';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';
import { CatalogoComponent } from '../catalogo.component';

@Component({
  selector: 'app-carrito-temporal',
  templateUrl: './carrito-temporal.component.html',
  styleUrls: ['./carrito-temporal.component.css']
})
export class CarritoTemporalComponent {

  constructor(public router:Router, public carritoS:CarritoService, public pedCatalogo:CatalogoComponent) { }

  cartItems!: ProductoInterface[];
  cantidades!: number[];

  ngOnInit(): void {
    this.cartItems = this.carritoS.obtenerCarritoTemporal();
  }

  elimProducto(index: number) {
    this.carritoS.eliminarProductoDelCarrito(index);
    this.cartItems = this.carritoS.obtenerCarritoTemporal();

  }

  incremento(index: any, maximo: any) {
    if (this.cartItems[index].cantidad!++ < maximo){
    this.cartItems[index].cantidad!++;
    }
  }
  
  decremento(index: any) {
    if (this.cartItems[index].cantidad! > 1){
    this.cartItems[index].cantidad!--;
    }
    
  }

  mostrarSweetAlert(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
    });
  }
  
  irAPedidos(){
    let idUsuario = Number(localStorage.getItem('id'));
    if(localStorage.getItem('token') != null){
      //Establecemos un timeout para que el sweet alert se muestre antes de redirigir
      setTimeout(() => {
        for (let i = 0; i < this.cartItems.length; i++) {
          this.pedCatalogo.agregarCTemporal(this.cartItems[i].id, this.cartItems[i].cantidad!);
        }
        this.carritoS.vaciarCarrito();
      }, 1500);
      this.router.navigate(['/Pedidos/'+idUsuario]);
      this.mostrarSweetAlert('Agregando pedidos', 'Espere un momento...', 'success');
      //Hacemos que se recargue la págian de pedidos para que se muestren los nuevos pedidos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    }else{
      this.mostrarSweetAlert('Error', 'Debes iniciar sesión para ver tus pedidos', 'error');
      this.router.navigate(['/Login']);
    }

  }
}
