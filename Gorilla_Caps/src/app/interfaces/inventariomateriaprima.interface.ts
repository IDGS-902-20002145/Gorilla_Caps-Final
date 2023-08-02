import { ExplotacionmaterialInterface } from "./explotacionmaterial.interface";

export interface InventariomateriaprimaInterface {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad: number;
    stock_Minimo: number;
    estatus: boolean;
    explotacionMaterial?: ExplotacionmaterialInterface;
    
}
