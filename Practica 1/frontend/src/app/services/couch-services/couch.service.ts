import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouchService {

  URL = 'https://arqui2-g26-pve.herokuapp.com/couch/';
  
  constructor(private http:HttpClient) { }

  public asignarCouch(iduser_couch:number, emailAtleta:string){
    return this.http.post(`${this.URL}`,{iduser_couch,emailAtleta});
  }
  
  public quitarCouch(emailAtleta:string){
    return this.http.post(`${this.URL}quitar`,{emailAtleta});
  }
  public listaAtleta(iduser_couch:number){
    return this.http.post(`${this.URL}listaAtleta`,{iduser_couch});
  }
  public preguntarCouch(email:string){
    return this.http.post(`${this.URL}preguntarCouch`,{email});
  }
  public listarCouchs(){
    return this.http.get(`${this.URL}listado`);
  }

}
