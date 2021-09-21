import { Injectable } from '@angular/core';
import {Necesidad} from './necesidad';
import localeES from '@angular/common/locales/es';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {formatDate,registerLocaleData} from '@angular/common'
@Injectable()
export class NecesidadService  {
  private UrlEndPoint:string='https://localhost:44387/api/necesidades';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  
  constructor(private http:HttpClient) { }

  
  getNecesidades():Observable< Necesidad[]>{
    return this.http.get<Necesidad[]>(this.UrlEndPoint);
  }
 
  getNecesidad(id):Observable< Necesidad>{
    return this.http.get<Necesidad>(`${this.UrlEndPoint}/${id}`);
  } 


  create(necesidad:Necesidad):Observable<Necesidad>{
    return this.http.post<Necesidad>(this.UrlEndPoint,necesidad,{headers:this.httpHeaders})
  }
  // update(necesidad:Necesidad):Observable<Necesidad>{
  //   return this.http.put<Necesidad>(`${this.UrlEndPoint}/${necesidad.id}`,necesidad,{headers:this.httpHeaders})
  // }
 
  delete(id:number):Observable<Necesidad>{
    return this.http.delete<Necesidad>(`${this.UrlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
}
