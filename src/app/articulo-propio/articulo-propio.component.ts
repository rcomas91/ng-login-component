import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from '../articulo/articulo';
import { ArticuloService } from '../articulo/articulo.service';
import { IntervaloService } from '../intervalo/intervalo.service';
import { Necesidad } from '../necesidad/necesidad';
import { NecesidadService } from '../necesidad/necesidad.service';
import { PozoService } from '../pozo/pozo.service';
import { SomeModel } from '../winatm/SomeModel';
import { WinatmService } from '../winatm/winatm.service';

@Component({
  selector: 'app-articulo-propio',
  templateUrl: './articulo-propio.component.html',
  styleUrls: ['./articulo-propio.component.css']
})
export class ArticuloPropioComponent implements OnInit {
  necid: number;
  um:string[]=['jgo','metros']
  constructor(
     private toastr: ToastrService,
    private pozoService: PozoService,
    private necesidadService: NecesidadService,
    private intervaloService: IntervaloService,
    private winatmService: WinatmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private articuloService: ArticuloService
  ) { }
  modoEdicion: boolean = false;
  articuloId: number;
  articulos: SomeModel[];
  necesidades:Necesidad[];
  articulosR: Articulo[] = [];
  formGroup: FormGroup;
  necesidad: Necesidad;
  articuloPropio: Articulo;
  formGroup2: FormGroup;
  intervaloId: number;
  resp:boolean=false;
  id:number;
  ngOnInit() {
    console.log(this.pozoService.construccion.construccionId);
    
    
    this.formGroup = this.fb.group({
      codigo: ["", [Validators.required]],
      intervaloId: [
        this.intervaloService.intervalo.intervaloId,
        [Validators.required],
      ],
      nombre: ["", [Validators.required]],
      UM: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      precioCUP: ["", [Validators.required]],
    });

    this.formGroup2 = this.fb.group({
      codigo: ["", [Validators.required]],
      intervaloId: [
        this.intervaloService.intervalo.intervaloId,
        [Validators.required],
      ],
      nombre: ["", [Validators.required]],
      UM: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      precioCUP: ["", [Validators.required]],
      utm_mov: ["", [Validators.required]],
      existencia: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      nombrePozo: [this.pozoService.pozo.nombrePozo, [Validators.required]],
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      console.log("editando...");
      this.articuloId = params["id"];

      this.articuloService.getArticulo(this.articuloId).subscribe(
        (art) => this.cargarFormulario(art),
        (error) => this.router.navigate(["/articulos"])
      );
    });
  }
  cargarFormulario(art: Articulo) {
    console.log(art.nombre);
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";
    this.formGroup.patchValue({
      id:art.id,
      codigo: art.codigo,
      intervaloId: art.intervaloId,
      nombre: art.nombre,
      UM: art.UM,
      cantidad: art.cantidad,
      precioCup: art.precioCUP,
    });
    
  }
  

  save() {
    this.articuloPropio = Object.assign({}, this.formGroup.value);
    console.table(this.articuloPropio);
    this.existe(this.articuloPropio.codigo,this.pozoService.pozo.nombrePozo);

    if (this.modoEdicion) {
      //edit register
      this.articuloPropio.id = this.id;
      this.articuloService.update(this.articuloPropio).subscribe(pozo => this.onSaveSuccess(),
        error => console.error(error));
    }

    else {
      //add register
      this.articuloService.create(this.articuloPropio).subscribe((art) => {
        this.articulosR.push(art);
        this.onSaveSuccess(), (error) => console.error(error);
      });
    }
  }
  onSaveSuccess() {
    this.formGroup2.controls["codigo"].setValue(this.formGroup.controls['codigo'].value);
    this.formGroup2.controls["nombre"].setValue(
      this.formGroup.controls['nombre'].value
    );
   
      this.formGroup2.controls["UM"].setValue(this.formGroup.controls['UM'].value);
      this.formGroup2.controls["precioCUP"].setValue(
        this.formGroup.controls['precioCUP'].value
      );
  
 
    this.formGroup2.controls["estado"].setValue("Pendiente a solicitar");
    this.formGroup2.controls["cantidad"].setValue(this.formGroup.controls['cantidad'].value);

    console.log(this.articulosR);
    let art: number = this.articulosR.pop().id;
    this.necesidad = Object.assign({}, this.formGroup2.value);
    console.table(this.necesidad);
    if(this.resp==false ){

    this.necesidadService.create(this.necesidad).subscribe(
      (x) => (this.necesidad = x),
      (error) => console.error(error)
    );
    this.toastr.warning(
      "Se agregó una nueva necesidad a la tabla Necesidades!",
      "Atento!"
    );
    }
    else{

           this.buscarIdNec(this.articuloPropio.codigo,this.pozoService.pozo.nombrePozo)
        }




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

  mostrarNombre(recurso?: SomeModel): string | undefined {
    return recurso ? recurso.mProducto_Descrip : undefined;
  }

  existe(codigo:string,nombrePozo:string){
    this.necesidadService.getNecesidades().subscribe (
      x => {
this.necesidades= x.filter(nec => nec.codigo == codigo && nec.nombrePozo==nombrePozo)

  if(this.necesidades.length>0)
    this.resp=true;
    console.log(this.resp)
      });

      return this.resp;

    }
    buscarIdNec(codigo:string,nombrePozo:string){
      let cant:number=0;
      this.necesidadService.getNecesidades().subscribe (
        x => {
  this.necesidades= x.filter(nec => nec.codigo == codigo && nec.nombrePozo==nombrePozo)
 // debugger
          this.necid=this.necesidades[0].id;
          this.necesidad.id=this.necid
          cant=Number(this.necesidad.cantidad)+this.necesidades[0].cantidad
          this.necesidad.cantidad=cant
          this.necesidadService.update(this.necesidad).subscribe(
            x=>this.necesidades);
        });


      this.toastr.warning(
       "Se actualizó una necesidad a la tabla Necesidades!",
       "Atento!"
     );
    }
    goBack(){
      // this._location.back();
       this.router.navigate(["/articulos"]);
     }

  }



