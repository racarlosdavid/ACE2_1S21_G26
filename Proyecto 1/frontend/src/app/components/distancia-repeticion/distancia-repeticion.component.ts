import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';

@Component({
  selector: 'app-distancia-repeticion',
  templateUrl: './distancia-repeticion.component.html',
  styleUrls: ['./distancia-repeticion.component.css']
})
export class DistanciaRepeticionComponent implements OnInit {

  objRes: any;
  dato: string = ""
  selectednombre:any

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
    
    this.dato = 'Distancia medida por repeticion';

    let elemento = document.querySelector<HTMLElement>('h1');
    if (elemento != undefined  && elemento != null){
      console.log(elemento.innerHTML)
      elemento.innerHTML = this.dato + " de " + this.selectednombre
    }
    this.showVelocidad()
  }

  private showVelocidad(): void{
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Usuario = <Usuario>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
      return;
    }
    
    //console.log(atleta.iduser)
    let idSelected = localStorage.getItem('idAtletaGrafica');
    if(idSelected != null){
      this.lecturaService.getReportDistancia(Number(idSelected)).subscribe((res) => {
        console.log(res);
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
