import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Construccion } from './Construccion';
import { ConstruccionService } from './construccion.service';
import { Pozo } from './pozo';
import { PozoService } from './pozo.service';

@Component({
  selector: 'app-pozo',
  templateUrl: './pozo.component.html',
  styleUrls: ['./pozo.component.css']
})
export class PozoComponent implements OnInit {
    @ViewChild(MatTable,{static: true}) table: MatTable<Pozo>;
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
  pozos: Pozo[];
  isLoading = true;

  constructor(private toastr: ToastrService,private constService:ConstruccionService,private pozoService:PozoService,  private fb: FormBuilder,  private router:Router,
    ) {

     }
    title="Pozos en el sistema"
     formGroup: FormGroup;

  displayedColumns = ['NombrePozo','Campana','Ubicacion','FechaInicio','FechaFin','Editar','Borrar','Ver Construcción'];
  dataSource: any;


  ngOnInit(){

    this.formGroup = this.fb.group({
      PozoId:['', [Validators.required]],
    })
  this.renderDataTable();

  }
  delete(pozoId:number) {
    if (confirm("Realmente desea cancelar?")) {

    this.pozoService.delete(pozoId).subscribe(pozo => this.renderDataTable(),
      error => console.error(error));
  }
}

  // delete(pozo:Pozo):void{
  //   this.pozoService.delete(pozo.PozoId).subscribe(
  //     response=>{
  //       this.pozos=this.pozos.filter(nec=>nec!==pozo)
  //     }
  //   )
  // }
  cargarData() {
    this.pozoService.getPozos().subscribe(
      pozosDesdesWS => this.pozos = pozosDesdesWS,

    );

  }

  renderDataTable() {
    this.pozoService.getPozos()
      .subscribe(
          x => {
            this.isLoading = false;
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = x;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    console.log(this.dataSource.data);
  },
  error => {
    this.isLoading = false;
    console.log('Ocurrió un error al consultar los Pozos!' + error);
  });
}

VerConst(construccion:Construccion,pozo:Pozo){
  console.log(construccion)
  this.router.navigate(['/intervalos'])

    this.pozoService.construccion=construccion;
    this.pozoService.pozo=pozo;
    this.toastr.info(
      
      'Comienza por agregar los intervalos del pozo en el botón Adicionar intervalo!',
      'Atento!',    {closeButton		:true,tapToDismiss	:false}
    );
  }




  AdicionarConst(id:number){
 
  this.formGroup.controls['PozoId'].setValue(id)
    let int: Construccion = Object.assign({}, this.formGroup.value);
    console.table(int);
     this.constService.create(int).subscribe(int=>this.onSaveSuccess(),error=>console.error(error));
  
     
     this.toastr.info(
      "Acaba de agregar una construcción a este pozo pulse en ver construcción para comenzar a usarla!",
      "Atento!",{progressBar:true,progressAnimation	:'increasing'}
    );

  }
  onSaveSuccess() {
    setTimeout(() => {
      this.isLoading=true;
      this.renderDataTable()
      this.router.navigate(["/pozos"]);
    }, 6000);

  }



}
