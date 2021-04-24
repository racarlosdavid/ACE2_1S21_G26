import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';

@Component({
  selector: 'app-panel-real-time',
  templateUrl: './panel-real-time.component.html',
  styleUrls: ['./panel-real-time.component.css']
})
export class PanelRealTimeComponent implements OnInit {

  public rutaImagen:string = '';
  public usuarioActivo;
  constructor(public lecturaService:LecturaService, private router:Router) {
    this.usuarioActivo = <Usuario>JSON.parse(localStorage.getItem('usuarioActivo'));
    if((this.usuarioActivo==null  ||  this.usuarioActivo==undefined)){
      router.navigate(['']);
      return;
    }
   }

  ngOnInit(): void {
  }
  
}
