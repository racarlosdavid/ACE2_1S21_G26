import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  URL = '35.209.252.22:3000/lectura/';
  
  constructor(private http:HttpClient) { }

  public postLectura(id_user:number, tipo:string, fecha:string, dato:number){
    return this.http.post(`${this.URL}`,{id_user,tipo,fecha,dato});
  }
  public getHistorial(iduser:number, tipo:string){
    return this.http.post(`${this.URL}historial`,{iduser,tipo});
  }
  public getHistorialMax(iduser:number, tipo:string){
    return this.http.post(`${this.URL}max`,{iduser,tipo});
  }
  public getHistorialMin(iduser:number, tipo:string){
    return this.http.post(`${this.URL}min`,{iduser,tipo});
  }
  public getHistorialProm(iduser:number, tipo:string){
    return this.http.post(`${this.URL}avg`,{iduser,tipo});
  }
  public getLecturaNow(iduser:number, tipo:string){
    return this.http.post(`${this.URL}now`,{iduser,tipo});
  }
  public getReportVelocidad(iduser:number){
    return this.http.post(`${this.URL}now`,{iduser});
  }
  public getReportDistancia(iduser:number){
    return this.http.post(`${this.URL}reportDistanci`,{iduser});
  }
  public getReportConteo(iduser:number){
    return this.http.post(`${this.URL}reportConteo`,{iduser});
  }
  public getReportRepeticionesMax(iduser:number){
    return this.http.post(`${this.URL}RepeticionesMax`,{iduser});
  }
  public getReportRepeticionesMin(iduser:number){
    return this.http.post(`${this.URL}RepeticionesMin`,{iduser});
  }
  public getReportRepeticionesProm(iduser:number){
    return this.http.post(`${this.URL}RepeticionesProm`,{iduser});
  }
}
