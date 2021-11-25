import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervalo } from '../intervalo/intervalo';
import { Pozo } from '../pozo/pozo';
import { Servicio } from './servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  intervalo:Intervalo;
  constructor(private http:HttpClient) { }

  private UrlEndPoint:string='https://localhost:44387/api/servicios';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  

  
  getServicios():Observable< Servicio[]>{
    return this.http.get<Servicio[]>(this.UrlEndPoint)
  }
 
  getServicio(id):Observable< Servicio>{
    return this.http.get<Servicio>(`${this.UrlEndPoint}/${id}`);
  } 


  create(Servicio:Servicio):Observable<Servicio>{
    return this.http.post<Servicio>(this.UrlEndPoint,Servicio,{headers:this.httpHeaders})
  }
  update(Servicio:Servicio):Observable<Servicio>{
    return this.http.put<Servicio>(`${this.UrlEndPoint}/${Servicio.servicioId}`,Servicio,{headers:this.httpHeaders})
  }
 
  delete(id:number):Observable<Servicio>{
    return this.http.delete<Servicio>(`${this.UrlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
}

