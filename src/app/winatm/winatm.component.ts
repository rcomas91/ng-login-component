import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { IntervaloService } from '../intervalo/intervalo.service';
import { SomeModel } from './SomeModel';
import { WinatmService } from './winatm.service';

@Component({
  selector: 'app-winatm',
  templateUrl: './winatm.component.html',
  styleUrls: ['./winatm.component.css']
})
export class WinatmComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<SomeModel>;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  someModels: SomeModel[];  
 
  constructor(private winatmService:WinatmService) { }
  displayedColumns = ['codigo','mProducto_Descrip','ProdAlm_Um','ProdAlm_Existencia','mProducto_Precio','UltmMov'];
  dataSource: any;


  

  ngOnInit(){
  
  this.renderDataTable();

  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  
}

 
  cargarData() {
    this.winatmService.getSomeModels().subscribe(
    winatmsDesdesWS => this.someModels = winatmsDesdesWS,

    );

  }

  renderDataTable() {
    this.winatmService.getSomeModels()
      .subscribe(
          x => {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data =x;
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
    console.log(this.dataSource.data);
  },
  error => {
    console.log('Ocurrió un error al consultar los winatms!' + error);
  });
}
  }

