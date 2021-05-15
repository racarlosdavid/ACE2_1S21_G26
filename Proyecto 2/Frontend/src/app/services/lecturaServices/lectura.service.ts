import { Injectable } from '@angular/core';
import { URL_API } from '../URL';
import { LecturaNow } from 'src/app/models/lectura-now'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lectura } from 'src/app/models/lectura';
import { Test } from 'src/app/models/test';
import { textChangeRangeIsUnchanged } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  URL = URL_API + '/lectura'

  constructor(private http:HttpClient) { }

  public getNow(iduser:number):Observable<LecturaNow>{
    return this.http.post<LecturaNow>(`${this.URL}/now`,{iduser:iduser});
  }
  //Reportes por test
  public getMin(opcion:string, iduser:string):Observable<Lectura[]>{
    return this.http.post<Lectura[]>(`${this.URL}/min`,{opcion:opcion,iduser:iduser});
  }
  public getMax(opcion:string, iduser:string):Observable<Lectura[]>{
    return this.http.post<Lectura[]>(`${this.URL}/max`,{opcion:opcion,iduser:iduser});
  }
  public getAvg(opcion:string, iduser:string):Observable<Lectura[]>{
    return this.http.post<Lectura[]>(`${this.URL}/avg`,{opcion:opcion,iduser:iduser});
  }
  //Reporte desde que se registro
  public getMinAll(opcion:string, iduser:string):Observable<Lectura>{
    return this.http.post<Lectura>(`${this.URL}/minAll`,{opcion:opcion,iduser:iduser});
  }
  public getMaxAll(opcion:string, iduser:string):Observable<Lectura>{
    return this.http.post<Lectura>(`${this.URL}/maxAll`,{opcion:opcion,iduser:iduser});
  }
  public getAvgAll(opcion:string, iduser:string):Observable<Lectura>{
    return this.http.post<Lectura>(`${this.URL}/avgAll`,{opcion:opcion,iduser:iduser});
  }
  public getReporteTest(iduser:number):Observable<Test[]>{
    return this.http.post<Test[]>(`${this.URL}/reporteTest`,{iduser:iduser})
  }
  public getGolpes(opcion:string, iduser:string):Observable<Lectura>{
    return this.http.post<Lectura>(`${this.URL}/golpes`,{opcion:opcion,iduser:iduser})
  }
  public getLecturaGrafica(iduser:number):Observable<LecturaNow[]>{
    return this.http.post<LecturaNow[]>(`${this.URL}/grafica`,{iduser:iduser})
  }
}
