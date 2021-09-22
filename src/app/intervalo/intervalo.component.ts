import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Articulo } from '../articulo/articulo';
import { PozoService } from '../pozo/pozo.service';
import { Intervalo } from './intervalo';
import { IntervaloService } from './intervalo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intervalo',
  templateUrl: './intervalo.component.html',
  styleUrls: ['./intervalo.component.css']
})
export class IntervaloComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Intervalo>;
  
intervalos: Intervalo[];  
cont:number;
  constructor(private _location:Location,private router:Router,private intervaloService:IntervaloService,public pozoService:PozoService) { }
  displayedColumns = ['intervaloId','construccionId','camisa','barrena','longitud','PrecioTotal','Editar','Borrar', 'Recursos'];
  dataSource: any;
  sum:number;
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

  calcularMonto(int:Intervalo):number{
    let sum=int.precioC+int.precioB;
    int.recursos.forEach((item:Articulo)=> {
      sum+=item.precioCUP*item.cantidad;
      
    });
    int.precioTotal=sum;
      return sum;
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
    setTimeout(() => {
      this.sum=0;
      this.dataSource.data.forEach((item:Intervalo)=> {
      this.sum+=item.precioTotal;
      });
      console.log(this.sum)
      return this.sum;
    }, 500);
   
  },
  error => {
    console.log('Ocurrió un error al consultar los Intervalos!' + error);
  });
}

VerRec(intervalo){
  console.log(intervalo)
  this.intervaloService.intervalo=intervalo;

  this.router.navigate(['/articulos'])



}

goBack(){
  this._location.back();
}

  }


