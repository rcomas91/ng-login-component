import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
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
  // autocompleteControl = new FormControl();
  seleccionado:any
  // serviciosfiltrados: Observable<any[]>;
  modoEdicion: boolean = false;
  Empresas:string[]=["Empercap","PETRAF","GW","Slumber","EPEPO"]
  Servicios:any[]=[
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS - POZO ABIERTO REGISTRO FINAL SCHLUMBERGER	"	,	subcode:	"	1504	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	OTROS GASTOS - GASTOS GENERALES (OVERHEAD)	"	,	subcode:	"	2503	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIOS DE LODOS - DISORCION TERMICA	"	,	subcode:	"	1403	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1700	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SUPERVICION - GEOLOGICA	"	,	subcode:	"	1702	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	MISCELANEAS, MATERIALES E INSUMOS - GASTOS DE PEAJES	"	,	subcode:	"	2411	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2000	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	BARRENAS - DIAMETRO 12 1/4"		,	subcode:	"	2003	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO -  LINER	"	,	subcode:	"	1204	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - SOLDADURA	"	,	subcode:	"	1614	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - COMPRA DEL TERRENO	"	,	subcode:	"	2309	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - SERVICIO LECHADA Y TAPONES	"	,	subcode:	"	1210	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS -  REGISTRO POZO ENCAMISADO	"	,	subcode:	"	1505	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS - MUD LOGGING	"	,	subcode:	"	1501	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - INGENIERO	"	,	subcode:	"	1216	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS - OTROS SERVICIOS GEOLOGICOS	"	,	subcode:	"	1510	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - OTROS	"	,	subcode:	"	1605	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO -  CAMISA DE PRODUCCION	"	,	subcode:	"	1205	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS - POZO ABIERTO GWDC	"	,	subcode:	"	1502	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - COMUNICACIONES	"	,	subcode:	"	1602	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - STINGER	"	,	subcode:	"	1213	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1100	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	RENTA DE EQUIPO DE PERFORACION - DTM	"	,	subcode:	"	1102	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2000	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	BARRENAS - DIAMETRO 17 1/2"		,	subcode:	"	2002	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	MISCELANEAS, MATERIALES E INSUMOS - ACCESORIOS Y PARTES DE TRANSPORTE LIGERO	"	,	subcode:	"	2410	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - DEPOSITO AUSA	"	,	subcode:	"	1613	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - VIAL DE ACCESO A LOS POZOS 	"	,	subcode:	"	2306	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - ASFALTO	"	,	subcode:	"	2310	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2000	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	BARRENAS - DIAMETRO 26"		,	subcode:	"	2001	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - REFORESTACION	"	,	subcode:	"	2308	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO -  ADITIVOS	"	,	subcode:	"	1207	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	MISCELANEAS, MATERIALES E INSUMOS - NEUMATICOS	"	,	subcode:	"	2408	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - RESTAURACION	"	,	subcode:	"	2307	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIOS DE LODOS - TECNICO DE LODOS	"	,	subcode:	"	1402	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIOS DE LODOS - LABORATORIO	"	,	subcode:	"	1401	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1700	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SUPERVICION - TOOL MASTER (EMPERCAP)	"	,	subcode:	"	1705	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2000	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	BARRENAS - DIAMETRO 7 5/8"		,	subcode:	"	2006	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - PERSONAL STANDBY	"	,	subcode:	"	1215	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - SERVICIOS  DE APOYO	"	,	subcode:	"	1604	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2000	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	BARRENAS - DIAMETRO 8 1/2"		,	subcode:	"	2005	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1700	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SUPERVICION - INTEGRIDAD DE POZOS	"	,	subcode:	"	1703	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - EXPLANADA Y CAMINOS	"	,	subcode:	"	2301	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	MISCELANEAS, MATERIALES E INSUMOS - INSUMOS DE COMPUTACION	"	,	subcode:	"	2404	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2100	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	CORTE NUCLEO Y SERVICIOS RELACIONADOS - CORONAS	"	,	subcode:	"	2103	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - CAMISA CONDUCTORA	"	,	subcode:	"	1201	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CONTROL DIRECCIONAL - LES	"	,	subcode:	"	1301	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS - POZO ABIERTO REGISTRO PARCIAL SCHLUMBERGER	"	,	subcode:	"	1503	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CONTROL DIRECCIONAL - GWDC	"	,	subcode:	"	1303	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2100	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	CORTE NUCLEO Y SERVICIOS RELACIONADOS - CORONAS	"	,	subcode:	"	2101	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	MISCELANEAS, MATERIALES E INSUMOS - MEDIOS DE PROTECCION INDIVIDUAL	"	,	subcode:	"	2401	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO -  CAMISA TRANQUE AGUA	"	,	subcode:	"	1202	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - ALQUILER TRANSPORTE PRIVADO	"	,	subcode:	"	1606	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - LECHADA REMEDIAL CONVENCIONAL	"	,	subcode:	"	1212	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2400	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	MISCELANEAS, MATERIALES E INSUMOS - UTILES DE ATENCION AL HOMBRE	"	,	subcode:	"	2405	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	REGISTROS - PRUEBA DE FORMACION	"	,	subcode:	"	1508	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - CARGO POR UNIDAD STANDBY	"	,	subcode:	"	1213	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2300	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOCACION Y ACCESOS - LINEA ELECTRICA SOTERRADA	"	,	subcode:	"	2302	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - LECHADA ESPECIAL	"	,	subcode:	"	1211	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1200	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SERVICIO CEMENTACION  Y EQUIPAMIENTO - LABORATORIO CEINPET	"	,	subcode:	"	1209	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1000	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	DIESEL,GRASAS,LUBRICANTES,AGUA - AGUA INDUSTRIAL	"	,	subcode:	"	1003	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1700	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	SUPERVICION	"	,	subcode:	"	NULL	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	2500	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	OTROS GASTOS - CONTINGENCIAS	"	,	subcode:	"	2502	"	}	,
    {	class:	"INTANGIBLE"	,	code:	"	1600	"	,	contgy_flg:	"	Y	"	,	costdesc:	"	LOGISTICA - INSPECCION DEL MATERIAL TUBULAR	"	,	subcode:	"	1611	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - LINER	"	,	subcode:	"	1904	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1800	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CABEZALES - SECCION B	"	,	subcode:	"	1803	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1800	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CABEZALES - SECCION C	"	,	subcode:	"	1804	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	2200	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	LODO Y PRODUCTOS QUIMICOS - MALLAS DE ZARANDAS	"	,	subcode:	"	2202	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - CAMISA INTERMEDIA	"	,	subcode:	"	1903	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - CAMISA CONDUCTORA	"	,	subcode:	"	1902	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - ACCESORIOS(ZAPATOS,CENTRALIZADORS, VALVULAS, ETC)	"	,	subcode:	"	1907	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - CAMISA DE TRANQUE DE AGUA	"	,	subcode:	"	1901	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - EXTERNAL CASING PACKER (ECP)	"	,	subcode:	"	1909	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - LINER HANGER Y ACCESORIOS	"	,	subcode:	"	1910	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1800	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CABEZALES - SECCION D	"	,	subcode:	"	1805	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1800	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CABEZALES - SECCION A	"	,	subcode:	"	1802	"	}	,
    {	class:	"TANGIBLE"	,	code:	"	1900	"	,	contgy_flg:	"	NULL	"	,	costdesc:	"	CASING Y ACCESORIOS - LINER FILTROS	"	,	subcode:	"	1905	"	}	,
    
  ]



  ngOnInit() {
    // this.serviciosfiltrados = this.autocompleteControl.valueChanges.pipe(
    //   map((value) =>
    //     typeof value === "string" ? value : value.costdesc
    //   ),
    //   flatMap((value) => (value ? this._filter(value) : []))
    // );


  this.formGroup = this.fb.group({
    Descripcion: [''],
    Empresa: ['', [Validators.required]],
    Codigo:  ['', [Validators.required]],
    Subcodigo:['', [Validators.required]],
    Contingencia:['', [Validators.required]],
    TipoServicio:['', [Validators.required]],

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

// private _filter(value: string): any[] {
//   const filterValue = value.toLowerCase();

//   return this.Servicios.filter(option=>option.toLowerCase().includes(filterValue));
// }

// mostrarNombre(servicio?: any): string | undefined {
//   return servicio ? servicio.costdesc : undefined;
// }
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


 
 myChange($event){
  console.log($event);
  this.seleccionado=$event;
  console.log(this.seleccionado)
  this.formGroup.controls['Codigo'].setValue(this.seleccionado.code)
  this.formGroup.controls['Subcodigo'].setValue(this.seleccionado.subcode)
  this.formGroup.controls['Contingencia'].setValue(this.seleccionado.contgy_flg)

  this.formGroup.controls['TipoServicio'].setValue(this.seleccionado.class)
  this.formGroup.controls['Descripcion'].setValue(this.seleccionado.costdesc)



}
}

