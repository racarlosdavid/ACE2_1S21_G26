import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { RespuestaGeneral } from 'src/app/models/respuesta-general'
import { RegistroNow } from 'src/app/models/registro-now'
import { RegistroLectura } from 'src/app/models/registro-lectura';
import { RegistroTest } from 'src/app/models/registro-test'
import { URL_API } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  URL = URL_API+'/lectura';

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
  public getTest(iduser:number):Observable<RegistroTest[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/test`,{iduser});
  }
  public getLecturaGrafica(iduser:number):Observable<RegistroNow[]|RespuestaGeneral>{
    return this.http.post(`${this.URL}/grafica`,{iduser});
  }
}
