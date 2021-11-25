

export interface Servicio {
  codigo:string;
  servicioId: number;
  tipoServicio: string;
  descripcion: string;
  empresa:string;
  fechaInicio?: Date;
  fechaFin?: Date;
  intervaloId?: number;
  pozoId?: number;
  costoCUP:number;

}
