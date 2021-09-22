import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
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
  pozos: Pozo[];

  constructor(private constService:ConstruccionService,private pozoService:PozoService,  private fb: FormBuilder,  private router:Router,
    ) {
      
     }

     formGroup: FormGroup;
   
  displayedColumns = ['PozoId','NombrePozo','Campana','Ubicacion','FechaInicio','FechaFin','Editar','Borrar','Ver Construcción'];
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
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = x;
    console.log(this.dataSource.data);
  },
  error => {
    console.log('Ocurrió un error al consultar los Pozos!' + error);
  });
}

VerConst(construccionId:string){
  console.log(construccionId)
  this.router.navigate(['/intervalos'])

    this.pozoService.construccionId=construccionId;

  }
  



  AdicionarConst(id:number){
  this.formGroup.controls['PozoId'].setValue(id)
    let int: Construccion = Object.assign({}, this.formGroup.value);
    console.table(int);
     this.constService.create(int).subscribe(int=>this.onSaveSuccess(),error=>console.error(error));
     


  }
  onSaveSuccess() {
    this.renderDataTable()
    this.router.navigate(["/pozos"]);
  }

 

}