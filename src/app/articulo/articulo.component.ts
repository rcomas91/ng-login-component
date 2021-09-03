import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { IntervaloService } from '../intervalo/intervalo.service';
import { Articulo } from "./articulo";
import { ArticuloService } from './articulo.service';
@Component({
  selector: 'app-articulo', 
  templateUrl: './articulo.component.html'
})
export class ArticuloComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Articulo>;
articulos: Articulo[];  

  constructor(private articuloService:ArticuloService,public intervaloService:IntervaloService) { }
  displayedColumns = ['id','intervaloId','codigo','control','nombre','seccion','estante','casilla', 'cup','existen','cuenta','subcuenta','precioCup','utm_mov'];
  dataSource: any;


  ngOnInit(){
  
  this.renderDataTable();
  console.log(this.intervaloService.intervaloId)

  }
  delete(id:number) {
    if (confirm("Realmente desea cancelar?")) {

    this.articuloService.delete(id).subscribe(articulo => this.renderDataTable(),
      error => console.error(error));
  }
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
    this.dataSource = new MatTableDataSource();
    console.log(this.intervaloService.intervaloId)
    this.dataSource.data = x.filter(art => art.intervaloId == this.intervaloService.intervaloId);
    console.log(this.dataSource.data);
  },
  error => {
    console.log('Ocurrió un error al consultar los articulos!' + error);
  });
}
  }

