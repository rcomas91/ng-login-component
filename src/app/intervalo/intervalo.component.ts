import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Articulo } from '../articulo/articulo';
import { PozoService } from '../pozo/pozo.service';
import { Intervalo } from './intervalo';
import { IntervaloService } from './intervalo.service';
import { Location } from '@angular/common';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-intervalo',
  templateUrl: './intervalo.component.html',
  styleUrls: ['./intervalo.component.css']
})
export class IntervaloComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Intervalo>;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  isLoading = true;
    panelOpenState = false;

intervalos: Intervalo[];
cont:number;
  constructor(private servicioService:ServicioService,private _location:Location,private router:Router,private intervaloService:IntervaloService,public pozoService:PozoService) { }
  displayedColumns = ['nombreIntervalo','longitud','PrecioTotal','Editar','Borrar', 'Recursos'];
  dataSource: any;
  title="Secciones del pozo "
  sum:number;
  sumBarrenas:number=0;
  sumCasingYacces=0;
  ngOnInit(){
  this.renderDataTable();
  console.log(this.pozoService.construccion.construccionId)

  }
  delete(intervaloId:number) {
    if (confirm("Realmente desea cancelar?")) {
      this.sumBarrenas=0;
    this.intervaloService.delete(intervaloId).subscribe(intervalo => this.renderDataTable(),
      error => console.error(error));
  }

  }

  calcularMonto(int:Intervalo):number{
    let sum=0;
    int.recursos.forEach((item:Articulo)=> {
      sum+=item.precioCUP*item.cantidad;

    });
    int.precioTotal=sum;
      return sum;
  }




  calcularMontoCyA(int:Intervalo){
    let sum=0;
    int.recursos.forEach((item:Articulo)=> {
      if(item.nombre.toLowerCase().indexOf('zapato')!=-1 || item.nombre.toLowerCase().indexOf('liner')!=-1 || item.nombre.toLowerCase().indexOf('casing')!=-1 || item.nombre.toLowerCase().indexOf('valvula')!=-1 || item.nombre.toLowerCase().indexOf('centralizador')!=-1)
      {
              sum+=item.precioCUP*item.cantidad;
      }
    });
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
            this.isLoading = false;

    this.dataSource = new MatTableDataSource();
    this.dataSource.data = x.filter(inter => inter.construccionId == this.pozoService.construccion.construccionId);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    console.log(this.dataSource.data);
    this.cont=this.dataSource.data.length;
    setTimeout(() => {
      this.sum=0;
      this.dataSource.data.forEach((item:Intervalo)=> {
      this.sum+=item.precioTotal;

      this.sumCasingYacces+=this.calcularMontoCyA(item)
      });
      console.log(this.sum)
      console.log(this.sumBarrenas)
      return this.sum;
    }, 500);

  },
  error => {
    this.isLoading = false;

    console.log('Ocurrió un error al consultar las Secciones!' + error);
  });
}

VerRec(intervalo){
  console.log(intervalo)
  this.intervaloService.intervalo=intervalo;

  this.router.navigate(['/articulos'])



}



goBack(){
 // this._location.back();
  this.router.navigate(["/pozos"]);
}



  }


