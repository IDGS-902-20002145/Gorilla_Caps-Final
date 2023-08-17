import { PedidoInterface } from "./pedido.interface";
import { ProductoInterface } from "./producto.interface";

export interface DetpedidoInterface {
    id?: number;
    pedidoId: number;
    productoId: number;
    cantidad: number;
    pedido: PedidoInterface;
    producto: ProductoInterface;
}
