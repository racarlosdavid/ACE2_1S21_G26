import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';
import {CantFalloRendido} from '../../models/CantFalloRendido';


@Component({
  selector: 'app-reporte-rendido',
  templateUrl: './reporte-rendido.component.html',
  styleUrls: ['./reporte-rendido.component.css']
})
export class ReporteRendidoComponent implements OnInit {

  objRes: any;
  dato: string = ""
  selectednombre:any
  vecesRendido:number;
  cantidadRendido:CantFalloRendido

  constructor(private router:Router, private lecturaService:LecturaService) { }

  ngOnInit(): void {
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
    
    this.dato = 'Veces que se ha rendido ';

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
      
      this.lecturaService.getReporteRendido(Number(idSelected)).subscribe((res) => {
        console.log('response: ',res);
        this.objRes = res;
      },
      err=>{
        alert(err.respuesta);
      }
      );


      this.lecturaService
      .getReporteVecesRendido(Number(idSelected))
      .subscribe(res =>{
        console.log('vecesFallo: ',res);
        
        this.cantidadRendido =  res as CantFalloRendido;
        this.vecesRendido = this.cantidadRendido.dato;

      },
      err => {
        alert(err.respuesta);

      });



    }
    
  }
}
