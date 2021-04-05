import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';
import {CantFalloRendido} from '../../models/CantFalloRendido';

@Component({
  selector: 'app-reporte-fallado',
  templateUrl: './reporte-fallado.component.html',
  styleUrls: ['./reporte-fallado.component.css']
})
export class ReporteFalladoComponent implements OnInit {

  objRes: any;
  dato: string = ""
  selectednombre:any
  vecesFallo:number;
 cantidadFallo:CantFalloRendido

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
    
    this.dato = 'Veces que ha fallado ';

    let elemento = document.querySelector<HTMLElement>('h1');
    if (elemento != undefined  && elemento != null){
      console.log(elemento.innerHTML)
      elemento.innerHTML = this.dato + " " + this.selectednombre
    }
    this.initElements()
  }

  private initElements(): void{
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
    console.log(idSelected);
    if(idSelected != null){
      
      this.lecturaService.getReporteFallo(Number(idSelected)).subscribe((res) => {
        console.log('response: ',res);
        this.objRes = res;
      },
      err=>{
        alert(err.respuesta);
      }
      );


      this.lecturaService
      .getReporteVecesFallo(Number(idSelected))
      .subscribe(res =>{
        console.log('vecesFallo: ',res);
        
        this.cantidadFallo =  res as CantFalloRendido;
        this.vecesFallo = this.cantidadFallo.dato;

      },
      err => {
        alert(err.respuesta);

      });



    }
    
  }

}
