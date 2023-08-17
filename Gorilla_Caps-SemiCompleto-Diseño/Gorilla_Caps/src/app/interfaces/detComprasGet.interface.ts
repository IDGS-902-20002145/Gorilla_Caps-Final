import { InventariomateriaprimaInterface } from "./inventariomateriaprima.interface";

export interface DetComprasGet {
    id: number;
    compraId: number;
    materialId: number;
    cantidad: number;
    precio: number;
    material: InventariomateriaprimaInterface;
}