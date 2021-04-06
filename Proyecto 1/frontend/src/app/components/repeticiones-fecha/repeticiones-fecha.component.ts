import { Component, OnInit } from '@angular/core';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service'
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';


@Component({
  selector: 'app-repeticiones-fecha',
  templateUrl: './repeticiones-fecha.component.html',
  styleUrls: ['./repeticiones-fecha.component.css']
})
export class RepeticionesFechaComponent implements OnInit {

  objRes:any
  dato: string = ""
  selectednombre:any
  obResP:any
  obResMin:any
  obResMax:any

  constructor(private lecturaService:LecturaService, private router:Router) { }

  ngOnInit(): void {
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
    
    this.dato = 'Velocidad alcanzada';

    let elemento = document.querySelector<HTMLElement>('h1');
    if (elemento != undefined  && elemento != null){
      console.log(elemento.innerHTML)
      elemento.innerHTML = this.dato + " de " + this.selectednombre
    }
    this.showConteo()
    this.showRepeticiones()
  }
  showConteo(){
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Usuario = <Usuario>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
      return;
    }
    let idSelected = localStorage.getItem('idAtletaGrafica');
    if(idSelected != null){
      this.lecturaService.getReportConteo(Number(idSelected)).subscribe((res) => {
        this.objRes = res
      },
      err=>{
        alert(err.respuesta);
      })
    }
  }

  showRepeticiones(){
    let idSelected = localStorage.getItem('idAtletaGrafica');
    if(idSelected != null){
      this.lecturaService.getReportRepeticionesProm(Number(idSelected)).subscribe((res) => {
        //console.log(res)
        let elemento = <HTMLElement>document.getElementById('promedio')
        if(elemento != undefined && elemento != null && res.dato != null){
          elemento.innerHTML = String(res.dato)
        }
      },
      err=>{
        alert(err.respuesta);
      })
      this.lecturaService.getReportRepeticionesMin(Number(idSelected)).subscribe((res) => {
        let elemento = <HTMLElement>document.getElementById('minimo')
        if(elemento != undefined && elemento != null && res.dato != null){
          elemento.innerHTML = String(res.dato)
        }
      },
      err=>{
        alert(err.respuesta);
      })
      this.lecturaService.getReportRepeticionesMax(Number(idSelected)).subscribe((res) => {
        let elemento = <HTMLElement>document.getElementById('maximo')
        if(elemento != undefined && elemento != null && res.dato != null){
          elemento.innerHTML = String(res.dato)
        }
      })
    }
  }

}
