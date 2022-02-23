import { Injectable } from '@angular/core';
import {Pozo} from './pozo';
import localeES from '@angular/common/locales/es';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {formatDate,registerLocaleData} from '@angular/common'
import { Construccion } from './Construccion';
@Injectable()
export class ConstruccionService  {
  private UrlEndPoint:string='https://localhost:44387/api/construccions';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  
  constructor(private http:HttpClient) { }

  create(Const:Construccion):Observable<Construccion>{
    return this.http.post<Construccion>(this.UrlEndPoint,Const,{headers:this.httpHeaders})
  }
}