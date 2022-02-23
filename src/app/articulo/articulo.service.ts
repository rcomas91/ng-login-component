import { Injectable } from '@angular/core';
import {Articulo} from './articulo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class ArticuloService  {
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  private UrlEndPoint:string='https://localhost:44387/api/recursos';
  constructor(private http:HttpClient) { 

  }
 
  getArticulos():Observable< Articulo[]>{
    return this.http.get<Articulo[]>(this.UrlEndPoint);
  } 

  delete(id:number):Observable<Articulo>{
    return this.http.delete<Articulo>(`${this.UrlEndPoint}/${id}`,{headers:this.httpHeaders})
  }

  getArticulo(id):Observable< Articulo>{
    return this.http.get<Articulo>(`${this.UrlEndPoint}/${id}`);
  } 
  update(Articulo:Articulo):Observable<Articulo>{
    return this.http.put<Articulo>(`${this.UrlEndPoint}/${Articulo.id}`,Articulo,{headers:this.httpHeaders})
  }

  
  create(Articulo:Articulo):Observable<Articulo>{
    return this.http.post<Articulo>(this.UrlEndPoint,Articulo,{headers:this.httpHeaders})
  }
}
