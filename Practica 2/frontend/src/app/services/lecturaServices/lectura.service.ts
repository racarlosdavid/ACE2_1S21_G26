import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { RespuestaGeneral } from 'src/app/models/respuesta-general'
import { RegistroNow } from 'src/app/models/registro-now'
import { RegistroLectura } from 'src/app/models/registro-lectura';
import { RegistroTest } from 'src/app/models/registro-test'

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  URL = 'http://35.209.151.29:4000/lectura';

  constructor(private http:HttpClient) { }

  public getLecturaNow(iduser:number):Observable<RegistroNow|RespuestaGeneral>{
    return this.http.post(`${this.URL}/now`,{iduser});
  }
  public getExhalaMax(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/exhalamax`,{iduser});
  }
  public getExhalaMin(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/exhalamin`,{iduser});
  }
  public getInhalaMax(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/inhalamax`,{iduser});
  }
  public getInhalaMin(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/inhalamin`,{iduser});
  }
  public getExhalaAvg(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/exhalaavg`,{iduser});
  }
  public getInhalaAvg(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/inhalaavg`,{iduser});
  }
  public getVo2Max(iduser:number):Observable<RegistroLectura[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/vo2`,{iduser});
  }
  public getTest(iduser:number):Observable<RegistroTest[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/test`,{iduser});
  }
  public getLecturaGrafica(iduser:number):Observable<RegistroNow[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/grafica`,{iduser});
  }
}
