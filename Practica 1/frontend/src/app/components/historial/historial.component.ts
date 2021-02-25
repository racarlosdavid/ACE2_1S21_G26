import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LecturaService } from 'src/app/services/lectura-services/lectura.service';
import { Atleta } from 'src/app/models/Atleta';
import { Respuesta } from 'src/app/models/Respuesta';
 
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  objRes: any;
  dato: string = ""

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    if(localStorage.getItem('tipoDato') == 'O'){
      this.dato = 'Historial de Oxigeno'
    }else if(localStorage.getItem('tipoDato') == 'R'){
      this.dato = 'Historial de Ritmo Cardiaco'
    }else if(localStorage.getItem('tipoDato') == 'T'){
      this.dato = 'Historial de Temperatura'
    }else{
      return;
    }
    let elemento = document.querySelector<HTMLElement>('h1');
    if (elemento != undefined  && elemento != null){
      console.log(elemento.innerHTML)
      elemento.innerHTML = this.dato
    }
    this.showHistorial()
  }

  private showHistorial(): void{
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Atleta = <Atleta>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
      return;
    }
    let tipo = localStorage.getItem('tipoDato')
    if(tipo == null){
      return;
    }
    console.log(atleta.iduser)
    this.lecturaService.getHistorial(atleta.iduser,tipo).subscribe((res) => {
      this.objRes = <Respuesta>res;
     // console.log(this.objRes.respuesta[0])
    })
  }

}
