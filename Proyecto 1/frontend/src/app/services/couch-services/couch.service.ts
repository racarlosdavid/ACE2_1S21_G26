import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouchService {

  URL = '35.209.252.22:3000/couch/';
  
  constructor(private http:HttpClient) { }

  public asignarCouch(iduser_couch:number, idUser:number){
    return this.http.post(`${this.URL}`,{iduser_couch,idUser});
  }

  public getTeam(iduser_couch:number){
    return this.http.post(`${this.URL}team`,{iduser_couch});
  }
  
  public quitarCouch(emailAtleta:string){
    return this.http.post(`${this.URL}quitar`,{emailAtleta});
  }
  public preguntarCouch(email:string){
    return this.http.post(`${this.URL}preguntarCouch`,{email});
  }
  public listarCouchs(){
    return this.http.get(`${this.URL}listado`);
  }

}
