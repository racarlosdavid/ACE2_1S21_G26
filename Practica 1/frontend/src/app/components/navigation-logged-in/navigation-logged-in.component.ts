import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Atleta } from 'src/app/models/Atleta';
import { AtletaService } from 'src/app/services/atleta-services/atleta.service';

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
 constructor(private router:Router, private atletaService:AtletaService) { 
  this.dateDay = new Date().toString().substring(16,25);
}
  ngOnInit(): void {
    this.intervalUpdate = setInterval(function(this: NavigationLoggedInComponent){
      this.dateDay = new Date().toString().substring(16,25);
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
    let atleta:Atleta = <Atleta>JSON.parse(usuarioActivo);
    if(atleta.email == null){
      return;
    }

    this.atletaService.cerrarSesion(atleta.email).subscribe(
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
}
