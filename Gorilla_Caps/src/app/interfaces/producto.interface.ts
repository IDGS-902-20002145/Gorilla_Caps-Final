import { ExplotacionmaterialInterface } from "./explotacionmaterial.interface";

export interface ProductoInterface {
  id?: number;
  nombre: string;
  descripcion: string;
  color: string;
  modelo: string;
  precio: number;
  cantidad?: number;
  imagen: string;
  stock_existencia: number;
  estatus: boolean;
  explotacion_material?: ExplotacionmaterialInterface[];
}
