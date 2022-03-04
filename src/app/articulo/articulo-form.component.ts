import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ArticuloService } from "./articulo.service";
import { Articulo } from "./articulo";
import { WinatmService } from "../winatm/winatm.service";
import { SomeModel } from "../winatm/SomeModel";
import { IntervaloService } from "../intervalo/intervalo.service";
import { Observable } from "rxjs";
import { flatMap, map, startWith } from "rxjs/operators";
import { Necesidad } from "../necesidad/necesidad";
import { NecesidadService } from "../necesidad/necesidad.service";
import { PozoService } from "../pozo/pozo.service";
import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-articulo-form",
  templateUrl: "./articulo-form.component.html",
  styleUrls: ["./articulo-form.component.css"],
})
export class ArticuloFormComponent implements OnInit {
  autocompleteControl = new FormControl();
  filteredOptions: Observable<SomeModel[]>;
  recursos: SomeModel[]=[];
  necid: number;

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
  ) {}
  modoEdicion: boolean = false;
  articuloId: number;
  articulos: SomeModel[];
  seleccionado: SomeModel;
  necesidades:Necesidad[];
  articulosR: Articulo[] = [];
  formGroup: FormGroup;
  necesidad: Necesidad;
  art: Articulo;
  formGroup2: FormGroup;
  intervaloId: number;
  resp:boolean=false;
  ngOnInit() {
    console.log(this.pozoService.construccion.construccionId);
    this.winatmService.getSomeModels().subscribe((art) => {
      (this.recursos = art);console.log(this.recursos)
    });
    this.filteredOptions = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.recursos.slice())
      );



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
      utm_mov: ["", [Validators.required]],
      existencia: ["", [Validators.required]],
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
    this.winatmService.getSomeModels().subscribe((art) => {
      (this.articulos = art), (this.seleccionado = this.articulos[0]);
    });

    //this.pozoService.getCustomers().subscribe(customersDeWs => this.customers = customersDeWs, error => console.error(error));
  }
  displayFn(recurso?: SomeModel): string | undefined {
    return recurso ? recurso.mProducto_Descrip : undefined;
  }

  private _filter(name: string): SomeModel[] {
    const filterValue = name.toLowerCase();

    return this.recursos.filter(option => option.mProducto_Descrip.toLowerCase().indexOf(filterValue) === 0);
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
      utm_mov: dp.transform(art.utm_mov, format),
      existencia: art.existencia,
    });
  }

  save() {
    this.seleccionado = this.autocompleteControl.value;
    console.log(this.seleccionado);
    this.formGroup.controls["codigo"].setValue(this.seleccionado.codigo);
    this.formGroup.controls["nombre"].setValue(
      this.seleccionado.mProducto_Descrip
    );
    if (
      this.seleccionado.mProducto_Descrip.startsWith("CAMISA") ||
      this.seleccionado.mProducto_Descrip.startsWith(
        "TUBERIA DE REVESTIMIENTO"
      ) ||
      this.seleccionado.mProducto_Descrip.startsWith("TUBERIA REVESTIMIENTO")
    ) {
      this.formGroup.controls["UM"].setValue("METROS-R3");
      this.formGroup.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio / 11.3
      );
    } else if (this.seleccionado.mProducto_Descrip.startsWith("TUBERIA")) {
      this.formGroup.controls["UM"].setValue("METROS -R2");
      this.formGroup.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio / 9.5
      );
    } else if (this.seleccionado.mProducto_Descrip.startsWith("CABILLA")) {
      this.formGroup.controls["UM"].setValue("METROS-R3");
      this.formGroup.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio / 7.6
      );
    } else {
      this.formGroup.controls["UM"].setValue(this.seleccionado.prodAlm_Um);
      this.formGroup.controls["UM"].setValue(this.seleccionado.prodAlm_Um);
      this.formGroup.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio
      );
    }
    this.formGroup.controls["utm_mov"].setValue(this.seleccionado.ultmMov);
    this.formGroup.controls["existencia"].setValue(
      this.seleccionado.prodAlm_Existencia
    );
    this.art = Object.assign({}, this.formGroup.value);

    console.table(this.art);
    this.existe(this.art.codigo,this.pozoService.pozo.nombrePozo);

    if (this.modoEdicion) {
      //edit register
      this.art.id = this.articuloId;

      this.articuloService.update(this.art).subscribe(
        (art) => this.onSaveSuccess(),
        (error) => console.error(error)
      );
    } else {
      //add register

      this.articuloService.create(this.art).subscribe((art) => {
        this.articulosR.push(art);
        this.onSaveSuccess(), (error) => console.error(error);
      });
    }
  }
  onSaveSuccess() {
    this.formGroup2.controls["codigo"].setValue(this.seleccionado.codigo);
    this.formGroup2.controls["nombre"].setValue(
      this.seleccionado.mProducto_Descrip
    );
    if (
      this.seleccionado.mProducto_Descrip.startsWith("CAMISA") ||
      this.seleccionado.mProducto_Descrip.startsWith(
        "TUBERIA DE REVESTIMIENTO"
      ) ||
      this.seleccionado.mProducto_Descrip.startsWith("TUBERIA REVESTIMIENTO")
    ) {
      this.formGroup2.controls["UM"].setValue("METROS-R3");
      this.formGroup2.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio / 11.3
      );
    } else if (this.seleccionado.mProducto_Descrip.startsWith("TUBERIA")) {
      this.formGroup2.controls["UM"].setValue("METROS -R2");
      this.formGroup2.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio / 9.5
      );
    } else if (this.seleccionado.mProducto_Descrip.startsWith("CABILLA")) {
      this.formGroup2.controls["UM"].setValue("METROS-R3");
      this.formGroup2.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio / 7.6
      );
    } else {
      this.formGroup2.controls["UM"].setValue(this.seleccionado.prodAlm_Um);
      this.formGroup2.controls["UM"].setValue(this.seleccionado.prodAlm_Um);
      this.formGroup2.controls["precioCUP"].setValue(
        this.seleccionado.mProducto_Precio
      );
    }

    this.formGroup2.controls["utm_mov"].setValue(this.seleccionado.ultmMov);
    this.formGroup2.controls["existencia"].setValue(
      this.seleccionado.prodAlm_Existencia
    );
    this.formGroup2.controls["estado"].setValue("Pendiente a solicitar");
    this.formGroup2.controls["cantidad"].setValue(this.art.cantidad);

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

           this.buscarIdNec(this.art.codigo,this.pozoService.pozo.nombrePozo)
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
