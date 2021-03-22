import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Atleta } from 'src/app/models/Atleta';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-principal',
  templateUrl: './dashboard-principal.component.html',
  styleUrls: ['./dashboard-principal.component.css']
})
export class DashboardPrincipalComponent implements OnInit {

  selectednombre:any
  public chartRitmo: any = null;
  public chartTemperatura: any = null;
  public chartOxigeno: any = null;

  constructor(private router:Router) { }

  ngOnInit(): void {
    //Grafica ritmo cardiaco
    this.chartRitmo = new Chart('realtimeRitmo', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Ritmo Cardiaco',
        fill: false,
        data: [],
        backgroundColor: '#CE3131',
        borderColor: '#CE3131'
         }
       ]
        },
        options: {
       tooltips: {
        enabled: false
       },
       legend: {
        display: true,
        position: 'bottom',
        labels: {
         fontColor: 'white'
        }
       },
       scales: {
         yAxes: [{
          ticks: {
           fontColor: "white"
          }
         }],
         xAxes: [{
        ticks: {
         fontColor: "white",
         beginAtZero: true
        }
         }]
       }
        }
     });

     //Grafica temperatura
    this.chartTemperatura = new Chart('realtimeTemperatura', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Temperatura Corporal',
        fill: false,
        data: [],
        backgroundColor: '#ECEF16',
        borderColor: '#ECEF16'
         }
       ]
        },
        options: {
       tooltips: {
        enabled: false
       },
       legend: {
        display: true,
        position: 'bottom',
        labels: {
         fontColor: 'white'
        }
       },
       scales: {
         yAxes: [{
          ticks: {
           fontColor: "white"
          }
         }],
         xAxes: [{
        ticks: {
         fontColor: "white",
         beginAtZero: true
        }
         }]
       }
        }
     });

     //Grafica oxigeno
    this.chartOxigeno = new Chart('realtimeOxigeno', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Concentracion de Oxigeno en la sangre',
        fill: false,
        data: [],
        backgroundColor: '#168ede',
        borderColor: '#168ede'
         }
       ]
        },
        options: {
       tooltips: {
        enabled: false
       },
       legend: {
        display: true,
        position: 'bottom',
        labels: {
         fontColor: 'white'
        }
       },
       scales: {
         yAxes: [{
          ticks: {
           fontColor: "white"
          }
         }],
         xAxes: [{
        ticks: {
         fontColor: "white",
         beginAtZero: true
        }
         }]
       }
        }
     });


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
