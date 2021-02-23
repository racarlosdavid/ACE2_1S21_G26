import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-logged-in',
  templateUrl: './navigation-logged-in.component.html',
  styleUrls: ['./navigation-logged-in.component.css']
})
export class NavigationLoggedInComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
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
}
