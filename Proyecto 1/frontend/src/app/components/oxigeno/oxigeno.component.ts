import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { Atleta } from 'src/app/models/Atleta';
import { Lectura } from 'src/app/models/Lectura';
import { Respuesta } from 'src/app/models/Respuesta';
import { AtletaService } from 'src/app/services/atleta-services/atleta.service';
import { LecturaService } from 'src/app/services/lectura-services/lectura.service';

@Component({
  selector: 'app-oxigeno',
  templateUrl: './oxigeno.component.html',
  styleUrls: ['./oxigeno.component.css']
})
export class OxigenoComponent implements OnInit {

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
  public chart: any = null;

  
  constructor(private router:Router, private atletaService:AtletaService, private lecturaService:LecturaService) { 
    this.dateDay = new Date().toString().substring(16,25);
    this.nombreAtletaGrafica = localStorage.getItem('nombreAtletaGrafica');
  }

  /**
  * On component initialization
  * @function ngOnInit
  * @return {void}
  */
  ngOnInit(): void {

    this.chart = new Chart('realtime', {
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

    this.intervalUpdate = setInterval(function(this: OxigenoComponent){
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
    let atleta:Atleta = <Atleta>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
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
    this.lecturaService.getLecturaNow(idAtletaGraficaN,'O').subscribe(
      res=>{
        let objRes = <Respuesta> res;
        let lecturaActual = <Lectura>objRes.respuesta[0];

        if(lecturaActual == undefined){
          console.log('No hay lecturas');
          return;
        }

        if(this.chart.data.labels.length > 10) {
          this.chart.data.labels.shift();
          this.chart.data.datasets[0].data.shift();
        }
        if(this.fechaAnterior != lecturaActual.fecha){
          this.chart.data.labels.push(lecturaActual.fecha?.substring(0,10)+'\n'+this.dateDay);
				  //this.chart.data.labels.push(this.dateDay);
          this.chart.data.datasets[0].data.push(lecturaActual.dato);
				  this.chart.update();
          //this.fechaAnterior = lecturaActual.fecha!=undefined?lecturaActual.fecha:'';
        }
        /*
        //this.chart.data.labels = [];
        //this.chart.data.data = [];
        for(let lectura of lecturas){
          this.chart.data.labels.push(lectura.fecha);
          this.chart.data.data.push(lectura.dato);

          //console.log(lectura.fecha)
          //console.log(lectura.dato)
        }
        this.chart.update();
        */
      },
      err=>{
        console.log(err);
      }
    );
  }

}
