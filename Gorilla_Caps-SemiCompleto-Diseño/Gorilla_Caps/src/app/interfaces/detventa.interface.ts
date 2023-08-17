import { ProductoInterface } from "./producto.interface";
import { VentaInterface } from "./venta.interface";

export interface DetventaInterface {
  id: number;
  ventaId: number;
  productoId: number;
  cantidad: number;
  precio: number;
  venta:
 VentaInterface; // Reemplaza "any" por VentaInterface si está definido
  producto: ProductoInterface; // Reemplaza "any" por ProductoInterface si está definido
}
