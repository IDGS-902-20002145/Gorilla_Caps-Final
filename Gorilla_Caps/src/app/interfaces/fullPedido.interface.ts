import { ProductoInterface } from "./producto.interface";

export interface FullPedidoInterface {
    id: number,
    UserId: number,
    fecha: Date,
    estatus: true,
    cantidad: number,
    producto: ProductoInterface
}