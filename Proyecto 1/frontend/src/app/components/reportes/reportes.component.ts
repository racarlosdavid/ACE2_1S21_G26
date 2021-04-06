import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

//TODO revisar que el tipo de dato de la respuesta sea dato y no t, d, r o cualquier otro valor... esa es una ruta que debe arreglar el moi... 
export class ReportesComponent implements OnInit {


  objRes: any;
  tipoDato: string = ""
  dato: string = ""
  atleta?:Usuario 
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
    this.atleta = <Usuario>JSON.parse(usuarioActivo);
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
    }else if(localStorage.getItem('tipoDato') == 'RT'){
      this.tipoDato = 'RT'
      this.dato = 'Repeticiones'
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

        if(this.tipoDato == 'T' || this.tipoDato== 'R'){

          this.lecturaService.getHistorialMin(Number(this.idselected),this.tipoDato).subscribe((res) =>{
            this.objRes = res;
            if(this.mostrarDato != undefined && this.mostrarDato != null){
              /*if(this.tipoDato=='T'){
                this.mostrarDato.innerHTML = this.objRes.t;
              }else if (this.tipoDato=='R'){
                this.mostrarDato.innerHTML = this.objRes.r;
              }*/
              this.mostrarDato.innerHTML = this.objRes.dato;
            }
            
          })
        }else if(this.tipoDato == 'RT'){
          this.lecturaService.getReportRepeticionesMin(Number(this.idselected)).subscribe(
            res=>{
              this.objRes = res;
              this.mostrarDato.innerHTML = this.objRes.dato;
            }
          );
        }

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

        if(this.tipoDato == 'R'  || this.tipoDato == 'T'){
          this.lecturaService.getHistorialMax(Number(this.idselected),this.tipoDato).subscribe((res) =>{
            this.objRes = res;
            if(this.mostrarDato != undefined && this.mostrarDato != null){
              /*
              if(this.tipoDato=='T'){
                this.mostrarDato.innerHTML = this.objRes.t;
              }else if (this.tipoDato=='R'){
                this.mostrarDato.innerHTML = this.objRes.r;
              }
              */
             this.mostrarDato.innerHTML = this.objRes.dato;
              
            }
            
          })
          
        }else if(this.tipoDato == 'RT'){
          this.lecturaService.getReportRepeticionesMax(Number(this.idselected)).subscribe(
            res=>{
              this.objRes = res;
              this.mostrarDato.innerHTML = this.objRes.dato;
            }
          );
        }
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

        if(this.tipoDato == 'R' || this.tipoDato == 'T'){
          this.lecturaService.getHistorialProm(Number(this.idselected),this.tipoDato).subscribe((res) =>{
            this.objRes = res;
            if(this.mostrarDato != undefined && this.mostrarDato != null){
              this.mostrarDato.innerHTML = this.objRes.dato;
            }
            
          })

        }else if(this.tipoDato == 'RT'){
          this.lecturaService.getReportRepeticionesProm(Number(this.idselected)).subscribe(
            res=>{
              this.objRes = res;
              this.mostrarDato.innerHTML = this.objRes.dato;
            }
          );
        }

        
        this.tipoReporte.innerHTML = this.dato + ' Promedio'
      }
      
      
    }

  }


}
