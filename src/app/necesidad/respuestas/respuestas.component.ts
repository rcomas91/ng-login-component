import { Component, OnInit } from '@angular/core';
import { Necesidad } from "../necesidad";
import { NecesidadService } from '../necesidad.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
})
export class RespuestasComponent implements OnInit {
  Respuesta: Necesidad[];

  constructor(private necesidadService: NecesidadService) { }

  ngOnInit() {
    this.necesidadService.getNecesidadesSatisfechas().subscribe(
      Respuesta=>this.Respuesta=Respuesta
  
    
    );
    }
}
