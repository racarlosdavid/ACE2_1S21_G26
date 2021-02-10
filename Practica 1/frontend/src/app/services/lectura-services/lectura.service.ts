import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  URL = 'https://arqui2-g26-pve.herokuapp.com/lectura/';
  
  constructor(private http:HttpClient) { }

  public postLectura(id_user:number, tipo:string, fecha:string, dato:number){
    return this.http.post(`${this.URL}`,{id_user,tipo,fecha,dato});
  }
  public getHistorial(iduser:number, tipo:string){
    return this.http.post(`${this.URL}historial`,{iduser,tipo});
  }
  public getHistorialMax(iduser:number, tipo:string){
    return this.http.post(`${this.URL}historialMax`,{iduser,tipo});
  }
  public getHistorialMin(iduser:number, tipo:string){
    return this.http.post(`${this.URL}historialMin`,{iduser,tipo});
  }
  public getHistorialProm(iduser:number, tipo:string){
    return this.http.post(`${this.URL}historialProm`,{iduser,tipo});
  }
  public getLecturaNow(iduser:number, tipo:string){
    return this.http.post(`${this.URL}now`,{iduser,tipo});
  }
}
