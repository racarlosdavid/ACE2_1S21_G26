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
export class UsuarioService {

  URL_API = URL+"/user";

  constructor(private http:HttpClient) { }

  public getUsers():Observable<Usuario[]|RespuestaGeneral>{
    return this.http.get(`${this.URL_API}/`);
  }

  public addUser(u:Usuario):Observable<RespuestaInsertarActualizar|RespuestaGeneral>{            //agregarle tama;o a los campos de la base de datos  
    return this.http.post(`${this.URL_API}/add`, {correo:u.correo, contrasena:u.contrasena, nombre:u.nombre, apellido:u.apellido, 
      edad:u.edad, genero:u.genero, peso_lb:u.peso_lb, estatura_cm:u.estatura_cm, estado_sesion:u.estado_sesion, estado_couch:u.estado_couch, 
      iduser_couch:u.iduser_couch, veces_rendido:u.veces_rendido, veces_fallado:u.veces_fallado
      });
  }

  public checkEmail(correo:string):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/checkEmail`, {correo});
  }

  public checkCredential(correo:string, contrasena:string):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/checkCredential`,{correo,contrasena});
  }

  public cerrarSesion(correo:string):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/cerrarSesion`,{correo});
  }

  public getVecesFallo(iduser:number):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/vecesFallo`,{iduser});
  }
  public getVecesRendido(iduser:number):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL_API}/vecesRendido`,{iduser});
  }

}
