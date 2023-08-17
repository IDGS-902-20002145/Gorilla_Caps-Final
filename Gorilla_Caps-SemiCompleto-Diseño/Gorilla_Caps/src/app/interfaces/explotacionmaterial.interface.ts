import { InventariomateriaprimaInterface } from "./inventariomateriaprima.interface";

export interface ExplotacionmaterialInterface {
    materialId: number;
    cantidadIndividual: number;
    material?: InventariomateriaprimaInterface;
    cantidadUsada?: number;
}
