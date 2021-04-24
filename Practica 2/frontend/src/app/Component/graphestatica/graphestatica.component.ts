import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Chart } from 'chart.js';
import { RegistroNow } from 'src/app/models/registro-now';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service'

@Component({
  selector: 'app-graphestatica',
  templateUrl: './graphestatica.component.html',
  styleUrls: ['./graphestatica.component.css']
})
export class GraphestaticaComponent implements OnInit {

  iduser:number
   /**
   * The ChartJS Object
   * @var {any} chart
   */
   public chartEstatica: Chart;

  constructor(private router:Router,private lectura:LecturaService,private activatedR: ActivatedRoute) {
    this.iduser = Number(localStorage.getItem('idAtletaGrafica'))
  }

  ngOnInit(): void {
    this.crearGrafica()
    this.activatedR.params.subscribe((params:Params) =>{
      //console.log(params)
      if(params.idtest != undefined){
        //console.log('Definido')
        this.showData(params.idtest)
      }else{
        console.log('sin parametro')
      }
    });
  }

  crearGrafica(){
    this.chartEstatica = new Chart('chartVolumen', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'VO2 MAX',
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

  private showData(idtest:String): void{
    this.removeData()
    this.lectura.getLecturaGrafica(this.iduser).subscribe((res) =>{
      let Res = <RegistroNow[]>res
      //console.log(Res)
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          //console.log(item.fecha + ' ' + item.hora + ' ' + item.inhala + ' ' + item.exhala)
          if(item.inhala == 0 && item.exhala == 0){
            console.log('ambos son cero')
          }else{
            this.chartEstatica.data.labels.push(item.hora)
            if(item.inhala != 0){
              this.chartEstatica.data.datasets[0].data.push(item.inhala);
              this.chartEstatica.update();
              }
            if(item.exhala != 0){
              this.chartEstatica.data.datasets[0].data.push(item.exhala * -1);
              this.chartEstatica.update();
            }
          }
        }
      }
    })
  }
  removeData(){
    this.chartEstatica.data.labels = []
    this.chartEstatica.data.datasets[0].data = []
    this.chartEstatica.update()
  }
}
