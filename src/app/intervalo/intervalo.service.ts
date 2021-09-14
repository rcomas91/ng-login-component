import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervalo } from './intervalo';

@Injectable({
  providedIn: 'root'
})
export class IntervaloService {


  intervalo:Intervalo;
  constructor(private http:HttpClient) { }

  private UrlEndPoint:string='https://localhost:44387/api/intervalos';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  

  
  getIntervalos():Observable< Intervalo[]>{
    return this.http.get<Intervalo[]>(this.UrlEndPoint)
  }
 
  getIntervalo(id):Observable< Intervalo>{
    return this.http.get<Intervalo>(`${this.UrlEndPoint}/${id}`);
  } 


  create(Intervalo:Intervalo):Observable<Intervalo>{
    return this.http.post<Intervalo>(this.UrlEndPoint,Intervalo,{headers:this.httpHeaders})
  }
  update(Intervalo:Intervalo):Observable<Intervalo>{
    return this.http.put<Intervalo>(`${this.UrlEndPoint}/${Intervalo.intervaloId}`,Intervalo,{headers:this.httpHeaders})
  }
 
  delete(id:number):Observable<Intervalo>{
    return this.http.delete<Intervalo>(`${this.UrlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
}

