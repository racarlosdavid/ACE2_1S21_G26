import { Component, OnInit } from '@angular/core';
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
  
  constructor(private historial:LecturaService) { 
    
    historial.getHistorial(2,"T").subscribe(
      res=>{
        console.log(res);
      }, 
      err=>{
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

}
