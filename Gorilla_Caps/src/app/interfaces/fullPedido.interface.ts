import { ProductoInterface } from "./producto.interface";

export interface FullPedidoInterface {
    id: number,
    UserId: number,
    fecha: Date,
    estatus: number,
    cantidad: number,
    producto: ProductoInterface
}
