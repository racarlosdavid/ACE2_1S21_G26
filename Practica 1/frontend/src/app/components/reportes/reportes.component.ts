import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LecturaService } from 'src/app/services/lectura-services/lectura.service';
import { Atleta } from 'src/app/models/Atleta';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  objRes: any;
  tipoDato: string = ""
  dato: string = ""
  atleta?:Atleta 
  tipoReporte = document.querySelector<HTMLElement>('#tipoReporte')
  mostrarDato = document.querySelector<HTMLElement>('#dato')
  reporte: boolean = false;
  idselected = localStorage.getItem('idAtletaGrafica')
  selectednombre = localStorage.getItem('nombreAtletaGrafica')

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    this.atleta = <Atleta>JSON.parse(usuarioActivo);
    if(this.atleta.iduser == null){
      return;
    }
    if(localStorage.getItem('tipoDato') == 'O'){
      this.tipoDato = 'O'
      this.dato = 'Oxigeno'
    }else if(localStorage.getItem('tipoDato') == 'R'){
      this.tipoDato = 'R'
      this.dato = 'Ritmo Cardiaco'
    }else if(localStorage.getItem('tipoDato') == 'T'){
      this.tipoDato = 'T'
      this.dato = 'Temperatura'
    }else{
      return;
    }
    let elemento = document.querySelector<HTMLElement>('h1');
    if (elemento != undefined && elemento != null){
      //console.log(elemento.innerHTML)
      elemento.innerHTML = 'Reportes de '+ this.dato + " de " + this.selectednombre
    }
  }

  public showMinimo(){
    this.reporte = true;
    this.tipoReporte = document.querySelector<HTMLElement>('#tipoReporte')
    this.mostrarDato = document.querySelector<HTMLElement>('#dato')
    if (this.tipoReporte != undefined && this.tipoReporte != null && this.idselected != undefined){
      //console.log(tipoReporte)
      if(localStorage.getItem('tipoDato') != null){
        this.lecturaService.getHistorialMin(Number(this.idselected),this.tipoDato).subscribe((res) =>{
          this.objRes = <Respuesta>res;
          if(this.mostrarDato != undefined && this.mostrarDato != null){
            this.mostrarDato.innerHTML = this.objRes.respuesta[0].min
          }
          
        })
        if(this.dato == "Temperatura"){
          this.tipoReporte.innerHTML = this.dato + ' mínima'
        }else{
          this.tipoReporte.innerHTML = this.dato + ' mínimo'
        }
      }
      
      
    }

  }
  public showMaximo(){
    this.tipoReporte = document.querySelector<HTMLElement>('#tipoReporte')
    this.mostrarDato = document.querySelector<HTMLElement>('#dato')
    if (this.tipoReporte != undefined && this.tipoReporte != null && this.idselected != undefined){
      //console.log(tipoReporte)
      if(localStorage.getItem('tipoDato') != null){
        this.lecturaService.getHistorialMax(Number(this.idselected),this.tipoDato).subscribe((res) =>{
          this.objRes = <Respuesta>res;
          if(this.mostrarDato != undefined && this.mostrarDato != null){
            this.mostrarDato.innerHTML = this.objRes.respuesta[0].max
          }
          
        })
        if(this.dato == "Temperatura"){
          this.tipoReporte.innerHTML = this.dato + ' máxima'
        }else{
          this.tipoReporte.innerHTML = this.dato + ' máximo'
        }
      }
      
      
    }

  }
  public showPromedio(){
    this.tipoReporte = document.querySelector<HTMLElement>('#tipoReporte')
    this.mostrarDato = document.querySelector<HTMLElement>('#dato')
    if (this.tipoReporte != undefined && this.tipoReporte != null && this.idselected != undefined){
      //console.log(tipoReporte)
      if(localStorage.getItem('tipoDato') != null){
        this.lecturaService.getHistorialProm(Number(this.idselected),this.tipoDato).subscribe((res) =>{
          this.objRes = <Respuesta>res;
          if(this.mostrarDato != undefined && this.mostrarDato != null){
            this.mostrarDato.innerHTML = this.objRes.respuesta[0].avg
          }
          
        })
        this.tipoReporte.innerHTML = this.dato + ' Promedio'
      }
      
      
    }

  }

}
