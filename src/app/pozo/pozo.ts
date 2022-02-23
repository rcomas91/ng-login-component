import { Construccion } from "./Construccion";

export interface Pozo {
  pozoId: number;
  nombrePozo: string;
  campana?: string;
  ubicacion:string;
  fechaInicio?: Date;
  fechaFin?: Date;
  construccion?: Construccion;
}
