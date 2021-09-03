import { Articulo } from "../articulo/articulo";

export interface Intervalo {
    intervaloId: number;
    construccionId?: string;
    camisa: string;
    barrena:string;
    longitud:string;
    articulos: Articulo[];
  }
  