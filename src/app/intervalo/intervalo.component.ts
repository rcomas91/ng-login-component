import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PozoService } from '../pozo/pozo.service';
import { Intervalo } from './intervalo';
import { IntervaloService } from './intervalo.service';

@Component({
  selector: 'app-intervalo',
  templateUrl: './intervalo.component.html',
  styleUrls: ['./intervalo.component.css']
})
export class IntervaloComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Intervalo>;
  
intervalos: Intervalo[];  
cont:number;
  constructor(private router:Router,private intervaloService:IntervaloService,public pozoService:PozoService) { }
  displayedColumns = ['intervaloId','construccionId','camisa','barrena','longitud','Editar','Borrar', 'Recursos'];
  dataSource: any;

 
  ngOnInit(){
  
  this.renderDataTable();
  console.log(this.pozoService.construccionId)

  }
  delete(intervaloId:number) {
    if (confirm("Realmente desea cancelar?")) {

    this.intervaloService.delete(intervaloId).subscribe(intervalo => this.renderDataTable(),
      error => console.error(error));
  }
}

 
  cargarData() {
    this.intervaloService.getIntervalos().subscribe(
      intervalosDesdesWS => this.intervalos = intervalosDesdesWS,

    );

  }

  renderDataTable() {
    this.intervaloService.getIntervalos()
      .subscribe(
          x => {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = x.filter(inter => inter.construccionId == this.pozoService.construccionId);
    console.log(this.dataSource.data);
    this.cont=this.dataSource.data.length;
  },
  error => {
    console.log('Ocurrió un error al consultar los Intervalos!' + error);
  });
}

VerRec(intervaloId:number){
  console.log(intervaloId)
  this.intervaloService.intervaloId=intervaloId;

  this.router.navigate(['/articulos'])



}
  }


