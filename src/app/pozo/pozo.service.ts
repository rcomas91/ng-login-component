import { Injectable } from '@angular/core';
import {Pozo} from './pozo';
import localeES from '@angular/common/locales/es';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {formatDate,registerLocaleData} from '@angular/common'
import { Construccion } from './Construccion';
@Injectable()
export class PozoService  {
  private UrlEndPoint:string='https://localhost:44387/api/pozos';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  construccion:Construccion;
  pozo:Pozo;
  constructor(private http:HttpClient) { }


  getPozos():Observable< Pozo[]>{
    return this.http.get<Pozo[]>(this.UrlEndPoint)
  }

  getPozo(id):Observable< Pozo>{
    return this.http.get<Pozo>(`${this.UrlEndPoint}/${id}`);
  }


  create(Pozo:Pozo):Observable<Pozo>{
    return this.http.post<Pozo>(this.UrlEndPoint,Pozo,{headers:this.httpHeaders})
  }
  update(Pozo:Pozo):Observable<Pozo>{
    return this.http.put<Pozo>(`${this.UrlEndPoint}/${Pozo.pozoId}`,Pozo,{headers:this.httpHeaders})
  }

  delete(id:number):Observable<Pozo>{
    return this.http.delete<Pozo>(`${this.UrlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
}
