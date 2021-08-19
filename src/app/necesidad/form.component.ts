import { Component, OnInit } from '@angular/core';
import { Necesidad } from 'src/app/necesidad/necesidad';
import { NecesidadService } from 'src/app/necesidad/necesidad.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Articulo } from 'src/app/articulo/articulo';
import { ArticuloService } from 'src/app/articulo/articulo.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  private necesidad:Necesidad=new Necesidad();
  private listaArticulos:Articulo[];
  
  private titulo:string="Añadir necesidad"

  constructor(private necesidadService:NecesidadService,
    private router:Router,
    private activateRoute:ActivatedRoute,private articuloService: ArticuloService
) { }



  ngOnInit() {
  
    this.cargarNecesidad()
    this.articuloService.getArticulos().subscribe(
      (listaArticulos)=>{this.listaArticulos=listaArticulos})
  }
 

  cargarNecesidad():void{
    this.activateRoute.params.subscribe(params=>{
   let id= params ['id']
   if(id){
     this.necesidadService.getNecesidad(id).subscribe(
       (necesidad)=>this.necesidad=necesidad)
   }

    })

  }

  public create():void{
    this.necesidadService.create(this.necesidad).subscribe(
response => this.router.navigate(['/necesidades'])

    )
  }
update():void{
  this.necesidadService.update(this.necesidad).subscribe(
    (necesidad)=>{this.router.navigate(['/necesidades'])

})
  }

  compararArticulos(o1:String,o2:String){
    if(o1===undefined && o2===undefined){
      return true;
    }
    
    return o1===null || o2===null || o1===undefined || o2===undefined ? false: o1===o2;
  }


  
}



