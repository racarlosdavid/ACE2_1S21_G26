import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})



export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const changeBackground = () => {
      let element = document.querySelector<HTMLElement>(".navbar-fixed-top");
      console.log("element")
      if (window.scrollY >= 50 && element != null) {
        element.style.background = "#4dc47d";
      }else if(window.scrollY < 50 && element != null){
        element.style.background = "transparent";
      }
      
    }
    window.addEventListener('scroll',changeBackground);
  }
}
