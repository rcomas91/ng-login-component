import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IntervaloService } from '../intervalo/intervalo.service';
import { PozoService } from '../pozo/pozo.service';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styleUrls: ['./servicios-form.component.css']
})
export class ServiciosFormComponent implements OnInit {

  constructor(private pozoService:PozoService,private servicioService:ServicioService,private router: Router,private intervaloService:IntervaloService,private activatedRoute: ActivatedRoute,private fb: FormBuilder) { }
  formGroup: FormGroup;
  servicioId:number;

  modoEdicion: boolean = false;
  Empresas:string[]=["Empercap","PETRAF","GW","Slumber","EPEPO"]
  TipoServicio:string[]=["Direccional","Cementacion","Quimica","Chupon","EPEPO"]

  ngOnInit() {
  
  this.formGroup = this.fb.group({
    Codigo:['', [Validators.required]],
    TipoServicio:['', [Validators.required]],
    Descripcion: [''],
    Empresa: ['', [Validators.required]],

    FechaInicio: ['' ],
    FechaFin: ['' ],
    IntervaloId: [null],
    PozoId: [ this.pozoService.pozo.pozoId, [Validators.required]],
    CostoCUP:['', [Validators.required]],

  });
  this.activatedRoute.params.subscribe(params => {
    if (params["id"] == undefined) {
      return;
    }
    this.modoEdicion = true;
    console.log("editando...")
    this.servicioId = params["id"];

    this.servicioService.getServicio(this.servicioId)
    .subscribe(serv => this.cargarFormulario(serv), error => this.router.navigate(["/servicios"]));

  });
//this.pozoService.getCustomers().subscribe(customersDeWs => this.customers = customersDeWs, error => console.error(error));
}

cargarFormulario(servicio: Servicio) {
  console.log(servicio.descripcion)
  var dp = new DatePipe(navigator.language);
  var format = "yyyy-MM-dd";
  this.formGroup.patchValue({
    Codigo:servicio.codigo,
    TipoServicio: servicio.tipoServicio,
    Descripcion:servicio.descripcion,
    Empresa:servicio.empresa,
    FechaInicio: dp.transform(servicio.fechaInicio, format),
    FechaFin: dp.transform(servicio.fechaFin, format),
    CostoCUP:servicio.costoCUP

  })
}

save() {
  let servicio: Servicio = Object.assign({}, this.formGroup.value);
  console.table(servicio);
  if (this.modoEdicion) {
    //edit register
    servicio.servicioId = this.servicioId;
    this.servicioService.update(servicio).subscribe(serv => this.onSaveSuccess(),
      error => console.error(error));
  }

  else {
    //add register
    this.servicioService.create(servicio).
      subscribe(serv => this.onSaveSuccess(),
      error => console.error(error));
  }
}
onSaveSuccess() {
  this.router.navigate(["/servicios"]);

}
goBack(){
  // this._location.back();
   this.router.navigate(["/intervalos"]);
 }

}

