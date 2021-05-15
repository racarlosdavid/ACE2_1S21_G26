import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavigationSesionComponent} from '../navigation-sesion/navigation-sesion.component';

@Component({
  selector: 'app-dashboard-principal',
  templateUrl: './dashboard-principal.component.html',
  styleUrls: ['./dashboard-principal.component.css']
})
export class DashboardPrincipalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  reportesRitmo(){
    localStorage.setItem('tipoDato','R');
    this.router.navigate(['reportes']);
  }
  historialRitmo(){
    localStorage.setItem('tipoDato','R');
    this.router.navigate(['historial']);
  }
  reportesTemperatura(){
    localStorage.setItem('tipoDato','T');
    this.router.navigate(['reportes']);
  }
  historialTemperatura(){
    localStorage.setItem('tipoDato','T');
    this.router.navigate(['historial']);
  } 
  reportesFuerza(){
    localStorage.setItem('tipoDato','V');
    this.router.navigate(['reportes']);
  }
  historialFuerza(){
    localStorage.setItem('tipoDato','F');
    this.router.navigate(['reportVelocidad']);
  }
}
