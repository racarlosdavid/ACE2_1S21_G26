import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouchService {

  URL = 'https://arqui2-g26-pve.herokuapp.com/couch/';
  
  constructor(private http:HttpClient) { }

  public asignarCouch(iduser_couch:number, nombreAtleta:string, apellidoAtleta:string){
    return this.http.post(`${this.URL}`,{iduser_couch,nombre:nombreAtleta, apellido:apellidoAtleta});
  }
  
  public quitarCouch(nombreAtleta:string, apellidoAtleta:string){
    return this.http.post(`${this.URL}quitar`,{nombre:nombreAtleta, apellido:apellidoAtleta});
  }

  public listaAtleta(iduser_couch:number){
    return this.http.post(`${this.URL}listaAtleta`,{iduser_couch});
  }
}
