import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { URL_API } from '../URL';
import { Usuario } from 'src/app/models/usuario';
import { RespuestaGeneral } from 'src/app/models/respuesta-general';
import { RespuestaInsertarActualizar } from 'src/app/models/respuesta-insertar-actualizar';
import { ActualizarUser } from 'src/app/models/actualizar-user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = URL_API+'/user';

  constructor(private http:HttpClient) { }

  public getUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.URL}`);
  }
  public updateUser(nuevo:Usuario):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL}/actualizar`,{iduser:nuevo.iduser, contrasena:nuevo.contrasena, edad:nuevo.edad,
      peso_lb:nuevo.peso_lb, estatura_cm:nuevo.estatura_cm});
  }
  public addUser(u:Usuario):Observable<RespuestaGeneral>{            //agregarle tama;o a los campos de la base de datos  
    return this.http.post(`${this.URL}/add`, {correo:u.correo, contrasena:u.contrasena, nombre:u.nombre, apellido:u.apellido, 
      edad:u.edad, genero:u.genero, peso_lb:u.peso_lb, estatura_cm:u.estatura_cm, estado_sesion:u.estado_sesion, estado_couch:u.estado_couch, 
      iduser_couch:u.iduser_couch
      });
  }
  public checkCredential(correo:string, contrasena:string):Observable<RespuestaGeneral>{
    return this.http.post(`${this.URL}/checkCredential`,{correo,contrasena});
  }

  public checkEmail():Promise<any>{
    return  this.http.get(`${this.URL}`).toPromise();
  }
}
