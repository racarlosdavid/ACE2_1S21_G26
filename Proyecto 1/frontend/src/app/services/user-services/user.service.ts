import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atleta } from 'src/app/models/Atleta';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = '35.209.252.22:3000/user/';

  constructor(private http:HttpClient) { }

  public getUsers(){
    return this.http.get(`${this.URL}`);
  }

  public addUser(atleta:Atleta){            //agregarle tama;o a los campos de la base de datos
    console.log(atleta);  
    return this.http.post(`${this.URL}add`, atleta);
  }

  public checkEmail(email:string){
    return this.http.post(`${this.URL}checkEmail`, {email});
  }

  public checkCredential(email:string, contrasena:string){
    return this.http.post(`${this.URL}checkCredential`,{email,contrasena});
  }

  public cerrarSesion(email:string){
    return this.http.post(`${this.URL}cerrarSesion`,{email});
  }
  public getVecesFallo(iduser:number){
    return this.http.post(`${this.URL}vecesFallo`,{iduser});
  }
  public getVecesRendido(iduser:number){
    return this.http.post(`${this.URL}vecesRendido`,{iduser});
  }
}
