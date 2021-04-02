import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroHistorial } from 'src/app/models/RegistroHistorial';
import { RegistroReporteConteo } from 'src/app/models/RegistroReporteConteo';
import { RegistroReporteDistancia } from 'src/app/models/RegistroReporteDistancia';
import { RegistroReporteVelocidad } from 'src/app/models/RegistroReporteVelocidad';
import { RespuestaGeneral } from 'src/app/models/RespuestaGeneral';
import { URL } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  URL_API = URL+"/lectura";

  constructor(private http:HttpClient ){ }

  //retorna el historial de un tipo de lectura, por ejemplo historial de ritmo cardiaco, oxigeno en la sangre, etc 
  public getHistorial(iduser:number, tipo:string):Observable<RegistroHistorial[]|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/historial`,{iduser,tipo});
  }

  public getHistorialMax(iduser:number, tipo:string):Observable<RegistroHistorial|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/max`,{iduser,tipo});
  }

  public getHistorialMin(iduser:number, tipo:string):Observable<RegistroHistorial|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/min`,{iduser,tipo});
  }

  public getHistorialProm(iduser:number, tipo:string):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/avg`,{iduser,tipo});
  }

  public getLecturaNow(iduser:number, tipo:string):Observable<RegistroHistorial|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/now`,{iduser,tipo});
  }
  /**periodo es lo mismo que repeticion */
  public getReportVelocidad(iduser:number):Observable<RegistroReporteVelocidad[]|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/reportVelocidad`,{iduser});
  }

  public getReportDistancia(iduser:number):Observable<RegistroReporteDistancia[]|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/reportDistanci`,{iduser});
  }

  public getReportConteo(iduser:number):Observable<RegistroReporteConteo[]|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/reportConteo`,{iduser});
  }

  public getReportRepeticionesMax(iduser:number):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/reportRepeticionesMax`,{iduser});
  }

  public getReportRepeticionesMin(iduser:number):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/reportRepeticionesMin`,{iduser});
  }

  public getReportRepeticionesProm(iduser:number):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/reportRepeticionesProm`,{iduser});
  }

}
