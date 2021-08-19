import { Construccion } from "./Construccion";

export interface Pozo {
  PozoId: number;
  NombrePozo: string;
  Campana: string;
  FechaInicio: Date;
  FechaFin: Date;
  Construccion: Construccion;
}
