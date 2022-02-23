import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstruccionService } from '../pozo/construccion.service';
import { PozoService } from '../pozo/pozo.service';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @ViewChild(MatTable,{static: true}) table: MatTable<Servicio>;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  servicios: Servicio[];
  isLoading = true;
  constructor(private pozoService: PozoService,private toastr: ToastrService,private constService:ConstruccionService,private servicioService:ServicioService,  private fb: FormBuilder,  private router:Router) { }
  title="Servicios del pozo "
  formGroup: FormGroup;

displayedColumns = ['Codigo','SubCodigo', 'Contingencia','TipoServicio','Descripcion','Empresa','FechaInicio','FechaFin','CostoCUP','Borrar'];
dataSource: any;

  ngOnInit() {
    this.formGroup = this.fb.group({
      ServicioId:['', [Validators.required]],
    })
  this.renderDataTable();

  }
  delete(servicioId:number) {
    if (confirm("Realmente desea cancelar?")) {

    this.servicioService.delete(servicioId).subscribe(serv => this.renderDataTable(),
      error => console.error(error));
  }
}
cargarData() {
  this.servicioService.getServicios().subscribe(
    servDesdesWS => this.servicios = servDesdesWS,

  );

}



  renderDataTable() {
    this.servicioService.getServicios()
      .subscribe(
          x => {
            this.isLoading = false;
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = x.filter((serv)=>
    serv.pozoId==this.pozoService.pozo.pozoId);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    console.log(this.dataSource.data);
  },
  error => {
    this.isLoading = false;
    console.log('Ocurrió un error al consultar los Servicios!' + error);
  });
}


goBack(){
  // this._location.back();
   this.router.navigate(["/intervalos"]);
 }
 

}
