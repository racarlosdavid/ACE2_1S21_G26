import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atleta } from 'src/app/models/Atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  URL = 'https://arqui2-g26-pve.herokuapp.com/atleta/';
  
  
  constructor(private http:HttpClient) { }

  public getAtletas(){
    return this.http.get(`${this.URL}`);
  }

  public updateAtleta(atleta:Atleta){
    return this.http.post(`${this.URL}update`, atleta);
  }

  public addAtleta(atleta:Atleta){            //agregarle tama;o a los campos de la base de datos
    console.log(atleta);  
    return this.http.post(`${this.URL}add`, atleta);
  }

  public checkEmail(email:string){
    return this.http.post(`${this.URL}checkEmail`, {email});
  }

  public checkCredential(email:string, contrasena:string){
    return this.http.post(`${this.URL}checkCredential`,{email,contrasena});
  }
  public dropUser(email:string){
    return this.http.post(`${this.URL}drop`, {email});
  }

}
