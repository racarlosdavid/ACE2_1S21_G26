import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  couch={

    "iduser_couch":2,
    "nombre":"mariita",
    "apellido":"diaz"

  };
  
  constructor(private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/user/profile']);
    }
  }

  ngOnInit(): void {
  }
}
