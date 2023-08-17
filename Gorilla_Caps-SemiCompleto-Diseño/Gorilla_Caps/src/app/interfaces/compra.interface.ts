import { DetalleCompra } from "./detcompra.interface";
import { ProveedorInterface } from "./proveedor.interface";

export interface Compra {
  ProveedorId: number;
  DetCompra: DetalleCompra[];
}