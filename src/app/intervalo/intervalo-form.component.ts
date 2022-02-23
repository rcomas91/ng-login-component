import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PozoService } from '../pozo/pozo.service';
import { SomeModel } from '../winatm/SomeModel';
import { WinatmService } from '../winatm/winatm.service';
import { Intervalo } from './intervalo';
import { IntervaloService } from './intervalo.service';

@Component({
  selector: 'app-intervalo-form',
  templateUrl: './intervalo-form.component.html',
  styleUrls: ['./intervalo-form.component.css']
})
export class IntervaloFormComponent implements OnInit {


  barrenas:SomeModel[];
  camisas:SomeModel[];
  constructor(private winatmService:WinatmService,private activatedRoute: ActivatedRoute, private pozoService:PozoService,private router: Router, private fb: FormBuilder, private intervaloService: IntervaloService) { }


  modoEdicion: boolean = false;
  intervaloId:number;
  formGroup: FormGroup;
  ConstruccionId: number;
  Bseleccionado:SomeModel;
  Cseleccionado:SomeModel;
  ngOnInit() {


    this.formGroup = this.fb.group({
      ConstruccionId:[this.pozoService.construccion.construccionId, [Validators.required]],
      Camisa: ['', [Validators.required]],
      Barrena: ['', [Validators.required]],
      Longitud: ['', [Validators.required]],
      PrecioC:['', [Validators.required]],
      PrecioB:['', [Validators.required]],

    });


    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      console.log("editando...")
      this.intervaloId = params["id"];

      this.intervaloService.getIntervalo(this.intervaloId)
        .subscribe(int => this.cargarFormulario(int), error => this.router.navigate(["/intervalos"]));


    });
    this.winatmService.getSomeModels().pipe(map(x=>
      x.filter(x=>x.mProducto_Descrip.toLowerCase().indexOf('barrena')!=-1)
    )
    ).subscribe(
       x=> {this.barrenas = x
       // this.Bseleccionado=this.barrenas[0];
       }
    )


    this.winatmService.getSomeModels().pipe(map(x=>
      x.filter(x=>x.mProducto_Descrip.toLowerCase().startsWith('camisa'))
    )
    ).subscribe(
       x=>{ this.camisas =x
        //this.Cseleccionado=this.camisas[0]
      }
    )
    }
    goBack(){
      // this._location.back();
       this.router.navigate(["/intervalos"]);
     }



  cargarFormulario(int: Intervalo) {
    console.log(int.intervaloId)
    
   

    this.formGroup.patchValue({
      ConstruccionId: int.construccionId,
      Camisa:int.camisa,
      Barrena: int.barrena,
      Longitud:int.longitud,
      PrecioB:int.precioB,
      PrecioC:int.precioC
    })
  }

  save() {

    let int: Intervalo = Object.assign({}, this.formGroup.value);
    console.table(int);
    if (this.modoEdicion) {
      //edit register
      int.intervaloId = this.intervaloId;
      this.intervaloService.update(int).subscribe(int => this.onSaveSuccess(),
        error => console.error(error));
    }

    else {
      //add register
      this.intervaloService.create(int).
        subscribe(int => this.onSaveSuccess(),
        error => console.error(error));
    }
  }
  onSaveSuccess() {

    this.router.navigate(["/intervalos"]);
  }

  myChange($event){
    console.log($event);
    this.Bseleccionado=$event;
    console.log(this.Bseleccionado)
    this.formGroup.controls['Barrena'].setValue(this.Bseleccionado.mProducto_Descrip)
    this.formGroup.controls['PrecioB'].setValue(this.Bseleccionado.mProducto_Precio)


  }
  myChange2($event){
    console.log($event);
    this.Cseleccionado=$event;
    console.log(this.Cseleccionado)
    this.formGroup.controls['Camisa'].setValue(this.Cseleccionado.mProducto_Descrip)
    this.formGroup.controls['PrecioC'].setValue(this.Cseleccionado.mProducto_Precio)


}
}
