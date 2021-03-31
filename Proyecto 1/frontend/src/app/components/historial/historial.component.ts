import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  objRes: any;
  dato: string = ""
  selectednombre:any

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
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
      elemento.innerHTML = this.dato + " de " + this.selectednombre
    }
    this.showHistorial()
  }

  private showHistorial(): void{
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Usuario = <Usuario>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
      return;
    }
    let tipo = localStorage.getItem('tipoDato')
    if(tipo == null){
      return;
    }
    //console.log(atleta.iduser)
    let idSelected = localStorage.getItem('idAtletaGrafica')
    if(idSelected != null){
      this.lecturaService.getHistorial(Number(idSelected),tipo).subscribe((res) => {
        this.objRes = res;
       // console.log(this.objRes.respuesta[0])
      },
      err=>{
        alert(err.respuesta);
      }
      )
    }
    
  }

}
