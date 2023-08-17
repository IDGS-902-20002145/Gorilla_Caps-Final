import { DetComprasGet } from "./detComprasGet.interface";
import { ProveedorInterface } from "./proveedor.interface";

export interface CompraGET {
    id: number;
    fecha: Date;
    proveedor: ProveedorInterface;
    total: number;
    estatus: boolean;
    detCompra: DetComprasGet[];
}
