import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  reportesDistanciaActual(){
    localStorage.setItem('tipoDato','D');
    this.router.navigate(['reportes']);
  }
  historialDistanciaActual(){
    localStorage.setItem('tipoDato','D');
    //this.router.navigate(['historial']);
    this.router.navigate(['reportDistancia']);
  }
  reportesDistanciaAcumulada(){
    localStorage.setItem('tipoDato','DT');
    this.router.navigate(['reportes']);
  }

  historialDistanciaAcumulada(){
    localStorage.setItem('tipoDato','DT');
    //this.router.navigate(['historial']);
    this.router.navigate(['reportDistancia']);
  }
  reportesTemperatura(){
    localStorage.setItem('tipoDato','T');
    this.router.navigate(['reportes']);
  }
  historialTemperatura(){
    localStorage.setItem('tipoDato','T');
    this.router.navigate(['historial']);
  } 
  reportesVelocidad(){
    localStorage.setItem('tipoDato','V');
    this.router.navigate(['reportes']);
  }
  historialVelocidad(){
    localStorage.setItem('tipoDato','V');
    //this.router.navigate(['historial']);
    this.router.navigate(['reportVelocidad']);
  }
  reportesRepeticiones(){
    localStorage.setItem('tipoDato','RT');
    this.router.navigate(['reportes']);
  }
  historialRepeticiones(){
    localStorage.setItem('tipoDato','RT');
    this.router.navigate(['historial']);
  }
}
