import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';
import { Chart } from 'chart.js';
import { Usuario } from 'src/app/models/usuario';
import { RegistroNow } from 'src/app/models/registro-now';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {



  public fechaAnterior:string = '';
  public horaAnterior:string = '';
  public nombreAtletaGrafica;
  public usuarioActivo:Usuario;
  public rutaImagen:string='';
  /**
  * Interval to update the chart
  * @var {any} intervalUpdate
  */
  private intervalUpdate: any = null;

  /**
  * The ChartJS Object
  * @var {any} chartRespiracion
  */
  public chartRespiracion: any = null;

  
  constructor(private router:Router, private userService:UsuarioService, private lecturaService:LecturaService) { 
    this.usuarioActivo = <Usuario>JSON.parse(localStorage.getItem('usuarioActivo'));
    if((this.usuarioActivo==null  ||  this.usuarioActivo==undefined)){
      router.navigate(['home']);
      return;
    }
    this.nombreAtletaGrafica = this.usuarioActivo.nombre+' '+this.usuarioActivo.apellido;
  }

  /**
  * On component initialization
  * @function ngOnInit
  * @return {void}
  */
  ngOnInit(): void {

    this.chartRespiracion = new Chart('realTimeRespiracion', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Respiracion',
        fill: false,
        data: [],
        backgroundColor: '#F502D4',
        borderColor: '#F502D4'
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

    this.intervalUpdate = setInterval(function(this: RealTimeComponent){
      this.showData();
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

    this.lecturaService.getLecturaNow(this.usuarioActivo.iduser).subscribe(
      res=>{
        console.log(res);
        let lecturaActual = <RegistroNow>res;

        if(lecturaActual == null ||  lecturaActual ==undefined) {
          console.log('No hay lecturas');
          return;
        }

        if(this.chartRespiracion.data.labels.length > 10) {
          this.chartRespiracion.data.labels.shift();
          this.chartRespiracion.data.datasets[0].data.shift();
        }
        if(this.horaAnterior != lecturaActual.hora){
          //this.horaAnterior = lecturaActual.hora;
          this.chartRespiracion.data.labels.push(lecturaActual.hora);
          if(lecturaActual.inhala==0)
          {
            this.chartRespiracion.data.datasets[0].data.push(lecturaActual.exhala*-1);  
            this.rutaImagen = 'assets/Imagenes/exhala.jpg';
          }
          else if(lecturaActual.exhala ==0)
          {
            this.chartRespiracion.data.datasets[0].data.push(lecturaActual.inhala);
            this.rutaImagen = 'assets/Imagenes/inhala.jpg';
          }
          this.chartRespiracion.update();
        }

      },
      err=>{
        console.log(err.respuesta);
      }
    );
  }

}
