import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Atleta } from 'src/app/models/Atleta';

@Component({
  selector: 'app-dashboard-principal',
  templateUrl: './dashboard-principal.component.html',
  styleUrls: ['./dashboard-principal.component.css']
})
export class DashboardPrincipalComponent implements OnInit {

  selectednombre:any

  constructor(private router:Router) { }

  ngOnInit(): void {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Atleta = <Atleta>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
      return;
    }
    this.selectednombre = localStorage.getItem('nombreAtletaGrafica')
    let elemento = document.querySelector<HTMLElement>('#titulo')
    if(elemento != undefined){
      elemento.innerHTML = "Rendimiento personal de " + this.selectednombre
    }
  }

  public historialTemp(){
    localStorage.setItem('tipoDato','T')
    this.router.navigate(['historial'])
  }
  public historialRitmo(){
    localStorage.setItem('tipoDato','R')
    this.router.navigate(['historial'])
  }
  public historialOxigeno(){
    localStorage.setItem('tipoDato','O')
    this.router.navigate(['historial'])
  }
  public reportesTemp(){
    localStorage.setItem('tipoDato','T')
    this.router.navigate(['reportes'])
  }
  public reportesRitmo(){
    localStorage.setItem('tipoDato','R')
    this.router.navigate(['reportes'])
  }
  public reportesOxigeno(){
    localStorage.setItem('tipoDato','O')
    this.router.navigate(['reportes'])
  }
  

}
