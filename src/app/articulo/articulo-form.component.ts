import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ArticuloService } from './articulo.service';
import { Articulo } from './articulo';
import { WinatmService } from '../winatm/winatm.service';
import { SomeModel } from '../winatm/SomeModel';
import { IntervaloService } from '../intervalo/intervalo.service';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { Necesidad } from '../necesidad/necesidad';
import { NecesidadService } from '../necesidad/necesidad.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']

})
export class ArticuloFormComponent implements OnInit {
  autocompleteControl = new FormControl();
  recursosfiltrados: Observable<SomeModel[]>;
  recursos:string[]=['One','Two'];

  constructor(private necesidadService: NecesidadService,private intervaloService:IntervaloService,private winatmService:WinatmService,private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private articuloService: ArticuloService) { }
  modoEdicion: boolean = false;
  articuloId:number;
  articulos:SomeModel[];
  seleccionado:SomeModel;

  formGroup: FormGroup;
  
  formGroup2: FormGroup;
  intervaloId: number;
  ngOnInit() {
    this.recursosfiltrados = this.autocompleteControl.valueChanges
    .pipe(
      map(value=>typeof value==='string'?value:value.mProducto_Descrip),
      flatMap(value =>value? this._filter(value):[])
    );

    this.formGroup = this.fb.group({
      codigo:['', [Validators.required]],
      intervaloId: [this.intervaloService.intervalo.intervaloId, [Validators.required]],
      nombre: ['', [Validators.required]],
      UM: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precioCUP: ['', [Validators.required]],
      utm_mov: ['', [Validators.required]],
      existencia :['', [Validators.required]],
      



    });
    this.formGroup2 = this.fb.group({
      codigo:['', [Validators.required]],
      intervaloId: [this.intervaloService.intervalo.intervaloId, [Validators.required]],
      nombre: ['', [Validators.required]],
      UM: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precioCUP: ['', [Validators.required]],
      utm_mov: ['', [Validators.required]],
      existencia :['', [Validators.required]],
      estado:['', [Validators.required]]



    });
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      console.log("editando...")
      this.articuloId = params["id"];

      this.articuloService.getArticulo(this.articuloId)
        .subscribe(art => this.cargarFormulario(art), error => this.router.navigate(["/articulos"]));

    });
    this.winatmService.getSomeModels().subscribe(
       art=> {this.articulos=art,
        this.seleccionado=this.articulos[0]
       });
      
//this.pozoService.getCustomers().subscribe(customersDeWs => this.customers = customersDeWs, error => console.error(error));
  }
  private _filter(value: string): Observable<SomeModel[]> {
    const filterValue = value.toLowerCase();
    
    return this.winatmService.getSomeModelsFiltrado(filterValue);
  }


  cargarFormulario(art: Articulo) {
    console.log(art.nombre)
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";
    this.formGroup.patchValue({
      codigo: art.codigo,
      intervaloId:art.intervaloId,
      nombre:art.nombre,
      UM:art.UM,
      cantidad:art.cantidad,
      precioCup:art.precioCUP,
      utm_mov: dp.transform(art.utm_mov, format),
      existencia:art.existencia
    })
  }

  save() {
    this.seleccionado=this.autocompleteControl.value;
    console.log(this.seleccionado)
  this.formGroup.controls['codigo'].setValue(this.seleccionado.codigo)
  this.formGroup.controls['nombre'].setValue(this.seleccionado.mProducto_Descrip)
  this.formGroup.controls['UM'].setValue(this.seleccionado.prodAlm_Um)
  this.formGroup.controls['precioCUP'].setValue(this.seleccionado.mProducto_Precio)
  this.formGroup.controls['utm_mov'].setValue(this.seleccionado.ultmMov)
  this.formGroup.controls['existencia'].setValue(this.seleccionado.prodAlm_Existencia)
    let art: Articulo = Object.assign({}, this.formGroup.value);
 
    console.table(art);
    if(art.existencia-art.cantidad<0){
      this.formGroup2.controls['codigo'].setValue(this.seleccionado.codigo)
    this.formGroup2.controls['nombre'].setValue(this.seleccionado.mProducto_Descrip)
    this.formGroup2.controls['UM'].setValue(this.seleccionado.prodAlm_Um)
    this.formGroup2.controls['precioCUP'].setValue(this.seleccionado.mProducto_Precio)
    this.formGroup2.controls['utm_mov'].setValue(this.seleccionado.ultmMov)
    this.formGroup2.controls['existencia'].setValue(this.seleccionado.prodAlm_Existencia)
    this.formGroup2.controls['cantidad'].setValue(art.cantidad-art.existencia)
  
    this.formGroup2.controls['estado'].setValue("Pendiente a solicitar")
  
      var necesidad: Necesidad = Object.assign({}, this.formGroup2.value);
      console.table(necesidad)
      
  
    }

   
    if (this.modoEdicion) {
      //edit register
      art.Id = this.articuloId;
      
      this.articuloService.update(art).subscribe(art => this.onSaveSuccess(),
        error => console.error(error));
    }

    else {
      //add register
     
        this.articuloService.create(art).
        subscribe(art => this.onSaveSuccess(),
        error => console.error(error));

      this.necesidadService.create(necesidad).subscribe(necesidad => this.onSaveSuccess(),
      error => console.error(error));
    }
  }
  onSaveSuccess() {
    this.router.navigate(["/articulos"]);
  }


  // myChange($event){
  //   console.log($event);
  //   this.seleccionado=$event;
  //   this.formGroup.controls['codigo'].setValue(this.seleccionado.codigo)
  //   this.formGroup.controls['nombre'].setValue(this.seleccionado.mProducto_Descrip)
  //   this.formGroup.controls['UM'].setValue(this.seleccionado.prodAlm_Um)
  //   this.formGroup.controls['precioCUP'].setValue(this.seleccionado.mProducto_Precio)
  //   this.formGroup.controls['utm_mov'].setValue(this.seleccionado.ultmMov)
  //   this.formGroup.controls['existencia'].setValue(this.seleccionado.prodAlm_Existencia)
    

  // }

  mostrarNombre(recurso?:SomeModel):string|undefined{
    return recurso? recurso.mProducto_Descrip: undefined;
  }
}
