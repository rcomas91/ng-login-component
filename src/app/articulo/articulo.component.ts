import { Component, OnInit } from '@angular/core';
import { Articulo } from "./articulo";
import { ArticuloService } from './articulo.service';
@Component({
  selector: 'app-articulo', 
  templateUrl: './articulo.component.html'
})
export class ArticuloComponent implements OnInit {
  articulos: Articulo[];
  constructor(private articuloService: ArticuloService) { }

  ngOnInit() {
  this.articuloService.getArticulos().subscribe(
    (articulos)=>{this.articulos=articulos}
  );
  }

}
