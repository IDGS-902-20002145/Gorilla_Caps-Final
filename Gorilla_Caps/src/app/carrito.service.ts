import { Injectable } from '@angular/core';
import { ProductoInterface } from './interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoTemporal: ProductoInterface[] = [];

  constructor() {
    // Al inicializar el servicio, intentamos cargar los datos previos del carrito
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      this.carritoTemporal = JSON.parse(storedCart);
    }
  }

  agregarProductoAlCarrito(producto: ProductoInterface) {
    this.carritoTemporal.push(producto);
    this.actualizarLocalStorage();
  }
  eliminarProductoDelCarrito(index: number) {
    if (index >= 0 && index < this.carritoTemporal.length) {
      this.carritoTemporal.splice(index, 1);
      this.actualizarLocalStorage();
    }
  }
  vaciarCarrito() {
    this.carritoTemporal = [];
    this.actualizarLocalStorage();
  }
  obtenerCarritoTemporal() {
    return this.carritoTemporal;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoTemporal));
  }
}
