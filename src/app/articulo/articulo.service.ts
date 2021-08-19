import { Injectable } from '@angular/core';
import {Articulo} from './articulo';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class ArticuloService  {

  private UrlEndPoint:string='http://localhost:8178/api/articulos';
  constructor(private http:HttpClient) { 

  }
 
  getArticulos():Observable< Articulo[]>{
    return this.http.get<Articulo[]>(this.UrlEndPoint);
  } 
}
