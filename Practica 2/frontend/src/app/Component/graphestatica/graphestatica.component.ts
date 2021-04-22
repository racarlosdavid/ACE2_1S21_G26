import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service'

@Component({
  selector: 'app-graphestatica',
  templateUrl: './graphestatica.component.html',
  styleUrls: ['./graphestatica.component.css']
})
export class GraphestaticaComponent implements OnInit {

  //public nombreAtletaGrafica;
  /**
  * Interval to update the chart
  * @var {any} intervalUpdate
  */
   private intervalUpdate: any = null;

   /**
   * The ChartJS Object
   * @var {any} chart
   */
   public chartEstatica: any = null;

  constructor(private router:Router,private lectura:LecturaService) { }

  ngOnInit(): void {
    
    this.chartEstatica = new Chart('chartVolumen', {
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

  }

}
