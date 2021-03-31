import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { CouchService } from 'src/app/services/couchServices/couch.service';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';
import 'bootstrap';

@Component({
  selector: 'app-navigation-logged-in',
  templateUrl: './navigation-logged-in.component.html',
  styleUrls: ['./navigation-logged-in.component.css']
})
export class NavigationLoggedInComponent implements OnInit {

  public dateDay;

  /**
  * Interval to update the chart
  * @var {any} intervalUpdate
  */
 private intervalUpdate: any = null;
 public isCouchVar:boolean=false;
 constructor(private router:Router, private userService:UsuarioService, private couchServices:CouchService) { 
  this.dateDay = new Date().toString().substring(16,25);
  let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Usuario = <Usuario>JSON.parse(usuarioActivo);
    if(atleta.correo == null){
      return;
    }

    if(atleta.estado_couch == 0){
      this.isCouchVar =false;
    }else{
      this.isCouchVar = true;
    }
    
  console.log(this.isCouchVar);
}
  ngOnInit(): void {
    this.intervalUpdate = setInterval(function(this: NavigationLoggedInComponent){
      this.dateDay = new Date().toString().substring(16,25);
      //this.isCouchVar = this.isCouch();
    }.bind(this), 1000);

    const changeBackground = () => {
      let element = document.querySelector<HTMLElement>(".navbar-fixed-top");
      let numero = document.querySelector('.overlay')?.scrollTop
      if(numero!=undefined){
        if (numero >= 50 && element != null) {
          element.style.background = "#4dc47d";
        }else if(window.scrollY < 50 && element != null){
          element.style.background = "transparent";
        }
      } 
    }
    document.querySelector('.overlay')?.addEventListener('scroll',changeBackground)
  }

  cerrarSesion(){

    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Usuario = <Usuario>JSON.parse(usuarioActivo);
    if(atleta.correo == null){
      return;
    }

    this.userService.cerrarSesion(atleta.correo).subscribe(
      res=>{
        console.log('Cerrando sesion');
      },
      err=>{
        console.log('Error al cerrar sesion');
      }
    );
    
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('idAtletaGrafica');
    localStorage.removeItem('nombreAtletaGrafica');
    this.router.navigate(['']);
  }
    /**
  * On component destroy
  * @function ngOnDestroy
  * @return {void}
  */
 private ngOnDestroy(): void {
  clearInterval(this.intervalUpdate);
  }
  
  
}
