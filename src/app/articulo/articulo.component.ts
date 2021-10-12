import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { IntervaloService } from '../intervalo/intervalo.service';
import { NecesidadComponent } from '../necesidad/necesidad.component';
import { NecesidadService } from '../necesidad/necesidad.service';
import { SomeModel } from '../winatm/SomeModel';
import { Articulo } from "./articulo";
import { ArticuloService } from './articulo.service';
import { Location } from '@angular/common';
import { PozoService } from '../pozo/pozo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo-component.css']

})
export class ArticuloComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Articulo>;
articulos: Articulo[];
item:SomeModel;
isLoading = true;
sum:number=this.intervaloService.intervalo.precioB+this.intervaloService.intervalo.precioC;
  cantPedidos: number;
  constructor(private _location:Location,private pozoService:PozoService,private necesidadService:NecesidadService, private articuloService:ArticuloService,public intervaloService:IntervaloService) { }
  displayedColumns = ['codigo','nombre','UM','cantidad','existencia','cantReal','precioCup','precioTotal','utm_mov','Borrar'];
  dataSource: any;

  title="Recursos del pozo "

  ngOnInit(){

  this.renderDataTable();
  console.log(this.intervaloService.intervalo)

  }
  delete(id:number) {
    if (confirm("Realmente desea retirar este recurso?")) {

    this.articuloService.delete(id).subscribe(articulo => this.renderDataTable(),
      error => console.error(error));


  }
}

goBack(){
  this._location.back();
}
  cargarData() {
    this.articuloService.getArticulos().subscribe(
    articulosDesdesWS => this.articulos = articulosDesdesWS,

    );

  }

  renderDataTable() {

    this.articuloService.getArticulos()
      .subscribe(
          x => {
            this.isLoading=false;
    this.dataSource = new MatTableDataSource();
    console.log(this.intervaloService.intervalo)
    this.dataSource.data = x.filter(art => art.intervaloId == this.intervaloService.intervalo.intervaloId)

            this.sum=this.intervaloService.intervalo.precioB+this.intervaloService.intervalo.precioC;
            this.dataSource.data.forEach((item:Articulo)=> {
              this.calcCantPedidosPorElem(item.codigo)
              this.sum+=item.precioCUP*item.cantidad;
              console.log(this.sum)
            });


    console.log(this.dataSource.data);

  },
  error => {
    this.isLoading = false;
    console.log('Ocurrió un error al consultar los articulos!' + error);
  });
}


calcCantPedidosPorElem(codigo:string){
  let cant=0;
  this.articuloService.getArticulos()
      .subscribe(
          x => {
    this.articulos= x.filter(art => art.codigo == codigo)
            this.articulos.forEach((item:Articulo)=> {
              cant+=item.cantidad;
              console.log(cant)
            });

            this.cantPedidos= cant;
          })

        }





  }


