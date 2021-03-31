import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from 'src/app/models/RespuestaGeneral';
import { RespuestaInsertarActualizar } from 'src/app/models/RespuestaInsertarActualizar';
import { Usuario } from 'src/app/models/Usuario';
import { URL } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class CouchService {

  URL_API = URL+"/couch";

  constructor(private http:HttpClient) { }

  public getAllCouch():Observable<Usuario[] | RespuestaGeneral>{  //anterior Nombre listarCouch
    return this.http.get(`${this.URL_API}/`);
  }

  public asignarCouch(iduser_couch:number, iduser:number):Observable<RespuestaInsertarActualizar|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/`,{iduser_couch, iduser});
  }

  public getTeam(iduser_couch:number):Observable<Usuario[]|RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/team`,{iduser_couch});
  }

}
