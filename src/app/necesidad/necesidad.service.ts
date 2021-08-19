import { Injectable } from '@angular/core';
import {Necesidad} from './necesidad';
import localeES from '@angular/common/locales/es';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {formatDate,registerLocaleData} from '@angular/common'
@Injectable()
export class NecesidadService  {
  private UrlEndPoint:string='http://localhost:8178/api/necesidades';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  
  constructor(private http:HttpClient) { }

  
  getNecesidades():Observable< Necesidad[]>{
    return this.http.get(this.UrlEndPoint).pipe(map(
      response=> {
        let necesidades=response as Necesidad[];
        return necesidades.map(necesidad=>{
          registerLocaleData(localeES,'es');
          necesidad.fecha=formatDate(necesidad.fecha,'dd-MM-yyyy','es')
         // necesidad.fecha=formatDate(necesidad.fecha,'MMMM','en-US')

          return necesidad;
        })
      }
    ))
  ;}
 
  getNecesidad(id):Observable< Necesidad>{
    return this.http.get<Necesidad>(`${this.UrlEndPoint}/${id}`);
  } 


  create(necesidad:Necesidad):Observable<Necesidad>{
    return this.http.post<Necesidad>(this.UrlEndPoint,necesidad,{headers:this.httpHeaders})
  }
  update(necesidad:Necesidad):Observable<Necesidad>{
    return this.http.put<Necesidad>(`${this.UrlEndPoint}/${necesidad.id}`,necesidad,{headers:this.httpHeaders})
  }
 
  delete(id:number):Observable<Necesidad>{
    return this.http.delete<Necesidad>(`${this.UrlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
  getNecesidadesSatisfechas():Observable<Necesidad[]>{
    return this.http.get<Necesidad[]>(`${this.UrlEndPoint}/Satisfechas`).pipe(map(
      response=> {
        let necesidades=response as Necesidad[];
        return necesidades.map(necesidad=>{
          registerLocaleData(localeES,'es');
          necesidad.fecha=formatDate(necesidad.fecha,'dd-MM-yyyy','es')
         // necesidad.fecha=formatDate(necesidad.fecha,'MMMM','en-US')

          return necesidad;
        })
      }
    ))
  ;}
  ;
  getNecesidadesNoSatisfechas():Observable<Necesidad[]>{
    return this.http.get<Necesidad[]>(`${this.UrlEndPoint}/NoSatisfechas`).pipe(map(
      response=> {
        let necesidades=response as Necesidad[];
        return necesidades.map(necesidad=>{
          registerLocaleData(localeES,'es');
          necesidad.fecha=formatDate(necesidad.fecha,'dd-MM-yyyy','es')
         // necesidad.fecha=formatDate(necesidad.fecha,'MMMM','en-US')

          return necesidad;
        })
      }
    ))
  ;}
  }
