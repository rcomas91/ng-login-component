import { Component, OnInit } from '@angular/core';
import { Necesidad } from "./necesidad";
import { NecesidadService } from './necesidad.service';
@Component({
  selector: 'app-necesidad',
  templateUrl: './necesidad.component.html',
})
export class NecesidadComponent implements OnInit {
  necesidades: Necesidad[];
  constructor(private necesidadService: NecesidadService) { }

  ngOnInit() {
  this.necesidadService.getNecesidades().subscribe(
    necesidades=>this.necesidades=necesidades
  
  );
  }

  delete(necesidad: Necesidad):void{
    this.necesidadService.delete(necesidad.id).subscribe(
      response=>{
        this.necesidades=this.necesidades.filter(nec=>nec!==necesidad)
      }
    )
  }

}
