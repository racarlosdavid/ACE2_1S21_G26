import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {



  public email:string='bmoisesg@gmail.com';
  public password:string='admin';

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/historial']);
    }
    
  }

  public iniciarSesion() {
    localStorage.removeItem('usuarioActivo');
    if (this.comprobarCampos(this.email, this.password)) {
      this.userService.checkCredential(this.email, this.password).subscribe(
        res => {
          //TODO la respuesta debe ser booleana no un string
          if(res.respuesta == "true"){
            alert('Ingreso Exitoso');
            localStorage.setItem('usuarioActivo', JSON.stringify(res.usuario));
            localStorage.setItem('idAtletaGrafica', JSON.stringify(res.usuario.iduser));
            localStorage.setItem('nombreAtletaGrafica', JSON.stringify(res.usuario.nombre+' '+res.usuario.apellido));
            this.router.navigate(['/historial']);
          }else{
            alert('Error al ingresar credenciales');
          }
          return true;
        },
        err => {
          //console.log(err);
          console.log(err.respuesta)
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
