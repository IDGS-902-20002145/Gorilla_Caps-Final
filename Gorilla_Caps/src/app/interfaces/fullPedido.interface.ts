import { ProductoInterface } from "./producto.interface";

export interface FullPedidoInterface {
    id: number,
    UserId: number,
    fecha: Date,
    estatus: 1,
    cantidad: number,
    producto: ProductoInterface
}
