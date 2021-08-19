import { Component, OnInit } from '@angular/core';
import { Necesidad } from 'src/app/necesidad/necesidad';
import { NecesidadService } from 'src/app/necesidad/necesidad.service';

@Component({
  selector: 'app-respuestas1',
  templateUrl: '/respuestas1.component.html',
})
export class Respuestas1Component implements OnInit {
  Respuesta: Necesidad[];

  constructor(private necesidadService: NecesidadService) { }

  ngOnInit() {
    this.necesidadService.getNecesidadesNoSatisfechas().subscribe(
      Respuesta=>this.Respuesta=Respuesta
  
    
    );
    }
}
