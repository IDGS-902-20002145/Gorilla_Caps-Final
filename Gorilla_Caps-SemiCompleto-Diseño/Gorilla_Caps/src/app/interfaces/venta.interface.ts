import { UserInterface } from "./user.interface";

export interface VentaInterface {
  id: number;
  userId: number;
  fecha: Date;
  estatus: boolean;
  user: UserInterface;
}
