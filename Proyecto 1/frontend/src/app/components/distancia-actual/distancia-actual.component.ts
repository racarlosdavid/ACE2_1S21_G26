import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroHistorial } from 'src/app/models/RegistroHistorial';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';
import { Chart } from 'chart.js';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-distancia-actual',
  templateUrl: './distancia-actual.component.html',
  styleUrls: ['./distancia-actual.component.css']
})
export class DistanciaActualComponent implements OnInit {

 
  public fechaAnterior:string = '';
  public dateDay;
  public nombreAtletaGrafica;
  /**
  * Interval to update the chart
  * @var {any} intervalUpdate
  */
  private intervalUpdate: any = null;

  /**
  * The ChartJS Object
  * @var {any} chart
  */
  public chartDistanciaActual: any = null;

  
  constructor(private router:Router, private userService:UsuarioService, private lecturaService:LecturaService) { 
    this.dateDay = new Date().toString().substring(16,25);
    this.nombreAtletaGrafica = localStorage.getItem('nombreAtletaGrafica');
  }

  /**
  * On component initialization
  * @function ngOnInit
  * @return {void}
  */
  ngOnInit(): void {

    this.chartDistanciaActual = new Chart('realtimeDistanciaActual', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Distancia Actual',
        fill: false,
        data: [],
        backgroundColor: '#3868CF',
        borderColor: '#3868CF'
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

    this.intervalUpdate = setInterval(function(this: DistanciaActualComponent){
      this.showData();
      this.dateDay = new Date().toString().substring(16,25);
    }.bind(this), 1000);
  }
  /**
  * On component destroy
  * @function ngOnDestroy
  * @return {void}
  */
  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }
  
  /**
  * Print the data to the chart
  * @function showData
  * @return {void}
  */
  private showData(): void {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let usuario:Usuario = <Usuario>JSON.parse(usuarioActivo);
    if(usuario.iduser == null){
      return;
    }
    //--------
    let idAtletaGrafica = localStorage.getItem('idAtletaGrafica');
    if((idAtletaGrafica == null  ||  idAtletaGrafica==undefined)){
      this.router.navigate(['']);
      return;
    }
    let idAtletaGraficaN:number = <number>JSON.parse(idAtletaGrafica);
    if(idAtletaGraficaN == null){
      return;
    }
    //--------
    //this.lecturaService.getLecturaNow(atleta.iduser,'O').subscribe(
      console.log(idAtletaGrafica);
    this.lecturaService.getLecturaNow(idAtletaGraficaN,'D').subscribe(
      res=>{
        let lecturaActual = <RegistroHistorial>res;
        console.log(res);

        if(lecturaActual == null ||  lecturaActual ==undefined) {
          console.log('No hay lecturas');
          return;
        }

        if(this.chartDistanciaActual.data.labels.length > 10) {
          this.chartDistanciaActual.data.labels.shift();
          this.chartDistanciaActual.data.datasets[0].data.shift();
        }
        if(this.fechaAnterior != lecturaActual.fecha){
          this.chartDistanciaActual.data.labels.push(lecturaActual.fecha);
				  //this.chart.data.labels.push(this.dateDay);
          this.chartDistanciaActual.data.datasets[0].data.push(lecturaActual.dato);
				  this.chartDistanciaActual.update();
        }

      },
      err=>{
        console.log(err.respuesta);
      }
    );
  }

}
