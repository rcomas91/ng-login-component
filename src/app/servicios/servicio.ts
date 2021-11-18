

export interface Servicio {
  servicioId: number;
  tipoServicio: string;
  descripcion: string;
  empresa:string;
  fechaInicio?: Date;
  fechaFin?: Date;
  intervaloId?: number;
}
