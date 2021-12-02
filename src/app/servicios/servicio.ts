

export interface Servicio {
  codigo:string;
  subCodigo:string;
  contingencia:string;
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
