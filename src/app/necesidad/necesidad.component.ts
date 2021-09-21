import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { IntervaloService } from '../intervalo/intervalo.service';
import { SomeModel } from '../winatm/SomeModel';
import { Necesidad } from "./necesidad";
import { NecesidadService } from './necesidad.service';
@Component({
  selector: 'app-necesidad',
  templateUrl: './necesidad.component.html',
})
export class NecesidadComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Necesidad>;
necesidades: Necesidad[];  
item:SomeModel;
sum:number=this.intervaloService.intervalo.precioB+this.intervaloService.intervalo.precioC;
  constructor(private necesidadService:NecesidadService,public intervaloService:IntervaloService) { }
  displayedColumns = ['id','intervaloId','codigo','nombre','UM','cantidad','existencia','precioCup','precioTotal','utm_mov','estado','Borrar'];
  dataSource: any;


  ngOnInit(){
 
  this.renderDataTable();
  console.log(this.intervaloService.intervalo)

  }
  delete(id:number) {
    if (confirm("Realmente desea cancelar?")) {

    this.necesidadService.delete(id).subscribe(nec => this.renderDataTable(),
      error => console.error(error));
  }
}

 
  cargarData() {
    this.necesidadService.getNecesidades().subscribe(
    necesidadesDesdesWS => this.necesidades = necesidadesDesdesWS,

    );

  }

  renderDataTable() {

    this.necesidadService.getNecesidades()
      .subscribe(
          x => {
    this.dataSource = new MatTableDataSource();
    console.log(this.intervaloService.intervalo)
    this.dataSource.data = x.filter(art => art.intervaloId == this.intervaloService.intervalo.intervaloId)
            this.dataSource.data.forEach((item:Necesidad)=> {
         
              this.sum+=item.precioCUP*item.cantidad;
              console.log(this.sum)
            });
      

    console.log(this.dataSource.data);

  },
  error => {
    console.log('Ocurrió un error al consultar las necesidades!' + error);
  });
}



}

