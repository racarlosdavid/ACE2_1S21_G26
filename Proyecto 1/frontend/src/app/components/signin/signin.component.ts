import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/models/Respuesta';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public email:string='correo@gmail.com';
  public password:string='admin';

  constructor(private userService:UserService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/user/profile']);
    }
    
  }

  public iniciarSesion() {
    localStorage.removeItem('usuarioActivo');
    if (this.comprobarCampos(this.email, this.password)) {
      this.userService.checkCredential(this.email, this.password).subscribe(
        res => {
          let objRes = <Respuesta>res;
          if(objRes.respuesta.length !=0){
            alert('Ingreso Exitoso');
            localStorage.setItem('usuarioActivo', JSON.stringify(objRes.respuesta[0]));
            localStorage.setItem('idAtletaGrafica', JSON.stringify(objRes.respuesta[0].iduser));
            localStorage.setItem('nombreAtletaGrafica', JSON.stringify(objRes.respuesta[0].nombre+' '+objRes.respuesta[0].apellido));
            this.router.navigate(['/user/profile']);
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
