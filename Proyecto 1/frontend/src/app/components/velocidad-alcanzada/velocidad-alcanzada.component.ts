import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';

@Component({
  selector: 'app-velocidad-alcanzada',
  templateUrl: './velocidad-alcanzada.component.html',
  styleUrls: ['./velocidad-alcanzada.component.css']
})
export class VelocidadAlcanzadaComponent implements OnInit {

  objRes: any;
  dato: string = ""
  selectednombre:any

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
    
    this.dato = 'Velocidad alcanzada';

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
      this.lecturaService.getReportVelocidad(Number(idSelected)).subscribe((res) => {
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
