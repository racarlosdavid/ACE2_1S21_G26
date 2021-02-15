import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Atleta } from 'src/app/models/Atleta';
import { AtletaService } from 'src/app/services/atleta-services/atleta.service';
import { CouchService } from 'src/app/services/couch-services/couch.service';
import { LecturaService } from 'src/app/services/lectura-services/lectura.service';

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
  
  constructor(private couchService:CouchService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/user/profile']);
    }
  }

  ngOnInit(): void {
  }

}
