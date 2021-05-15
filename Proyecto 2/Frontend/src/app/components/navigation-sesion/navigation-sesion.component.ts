import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-sesion',
  templateUrl: './navigation-sesion.component.html',
  styleUrls: ['./navigation-sesion.component.css']
})
export class NavigationSesionComponent implements OnInit {

  public dateDay;

    /**
  * Interval to update the chart
  * @var {any} intervalUpdate
  */
 private intervalUpdate: any = null;
 
  constructor(private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
  }

  ngOnInit(): void {
    this.intervalUpdate = setInterval(function(this: NavigationSesionComponent){
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
    localStorage.removeItem('usuarioActivo');
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
