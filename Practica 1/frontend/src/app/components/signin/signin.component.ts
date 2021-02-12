import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/models/Respuesta';
import { AtletaService } from 'src/app/services/atleta-services/atleta.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public email:string='bmoisesg@gmail.com';
  public password:string='admin';

  constructor(private atletaService:AtletaService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    //TODO quitar el comentario cuando ya este hecho el componente del dashboard principal
    /*  
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/principal']);
    }
    */
  }

  public iniciarSesion() {
    localStorage.removeItem('usuarioActivo');
    if (this.comprobarCampos(this.email, this.password)) {
      this.atletaService.checkCredential(this.email, this.password).subscribe(
        res => {
          //TODO agregar modelo de respuesta, estandarizar respuestas del servidor
          let objRes = <Respuesta>res;
          if(objRes.respuesta.length !=0){
            alert('Ingreso Exitoso');
            localStorage.setItem('usuarioActivo', objRes.respuesta[0].email);
          }else{
            alert('Error al ingresar credenciales');
          }
          return true;
        },
        err => {
          //console.log(err);
          console.log(err)
          return false;
        }
      );
    }
    return false;
  }

  public comprobarCampos(email:string, password:string) {
    if (email == '') {
      alert('Llene el campo de correo electronico');
      return false;
    } else if (password == '') {
      alert('Llene el campo contrasenia');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }

}
