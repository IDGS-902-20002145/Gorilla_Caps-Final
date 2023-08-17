import { ExplotacionmaterialInterface } from "./explotacionmaterial.interface";

export interface materiaPrimaInterface {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad: number;
    stock_Minimo: number;
    estatus: boolean;
    explotacionMaterial?: ExplotacionmaterialInterface;
    seleccionado: boolean;

    
}