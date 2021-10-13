import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PozoService } from './pozo.service';
import { Pozo } from './pozo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pozo-form',
  templateUrl: './pozo-form.component.html',
})
export class PozoFormComponent implements OnInit {

  constructor(    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private pozoService: PozoService) { }
  modoEdicion: boolean = false;
  pozoId:number;
  formGroup: FormGroup;
  ConstruccionId: number;
  ubicaciones:string[]=["Varadero Oeste","Fraile","Santa Cruz","Santa Maria","Boca de Jaruco"]

  ngOnInit() {

    this.formGroup = this.fb.group({
      NombrePozo:['', [Validators.required]],
      Campana: [''],
      Ubicacion: ['', [Validators.required]],

      FechaInicio: ['' ],
      FechaFin: ['' ],
      ConstruccionId: ['', [Validators.required]],
    });
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      console.log("editando...")
      this.pozoId = params["id"];

      this.pozoService.getPozo(this.pozoId)
        .subscribe(pozo => this.cargarFormulario(pozo), error => this.router.navigate(["/pozos"]));

    });
//this.pozoService.getCustomers().subscribe(customersDeWs => this.customers = customersDeWs, error => console.error(error));
  }

  cargarFormulario(pozo: Pozo) {
    console.log(pozo.nombrePozo)
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";
    this.formGroup.patchValue({
      NombrePozo: pozo.nombrePozo,
      Campana:pozo.campana,
      Ubicacion:pozo.ubicacion,
      FechaInicio: dp.transform(pozo.fechaInicio, format),
      FechaFin: dp.transform(pozo.fechaFin, format)

    })
  }

  save() {
    let pozo: Pozo = Object.assign({}, this.formGroup.value);
    console.table(pozo);
    if (this.modoEdicion) {
      //edit register
      pozo.pozoId = this.pozoId;
      this.pozoService.update(pozo).subscribe(pozo => this.onSaveSuccess(),
        error => console.error(error));
    }

    else {
      //add register
      this.pozoService.create(pozo).
        subscribe(order => this.onSaveSuccess(),
        error => console.error(error));
    }
  }
  onSaveSuccess() {
    this.router.navigate(["/pozos"]);

  }
  goBack(){
    // this._location.back();
     this.router.navigate(["/pozos"]);
   }

}
