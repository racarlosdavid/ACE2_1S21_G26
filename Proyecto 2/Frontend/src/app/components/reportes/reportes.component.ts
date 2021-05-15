import { Component, OnInit } from '@angular/core';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  Res: any
  iduser: number
  username:String

  constructor(private lectura:LecturaService, private router:Router,private activatedR: ActivatedRoute) { 
    this.iduser = Number(localStorage.getItem('idAtletaGrafica'))
    this.username = localStorage.getItem('nombreAtletaGrafica')
  }

  ngOnInit(): void {
    this.cargarTests()
  }

  cargarTests(){
    let select = document.getElementById('selectElementId')
    if(select != undefined){
      this.lectura.getReporteTest(this.iduser).subscribe((res) =>{
        let respuesta = <Test[]>res
        this.Res = respuesta
        console.log(res)
        for(let item of this.Res){
          //console.log(item.idtest)
          let option = document.createElement('option')
          option.value = item.idtest
          option.innerHTML = item.fecha + ' ' + item.hora
          select.appendChild(option)
        } 
      })
    }
  }


  selectTest(valor:string){
    if(valor == 'Seleccione'){
      alert('Debe seleccionar un test!')
      return
    }else{
      //console.log(valor)
      this.router.navigate(['reportes',valor])
    }
  }

  getParam(){
    this.activatedR.params.subscribe((params:Params) =>{
      //console.log(params)
      if(params.idtest != undefined){
        //console.log('Definido')
        return params.idtest
      }else{
        console.log('sin parametro')
      }
    })
  }

  cargarTemp(){
    let iduser = this.getParam();
    
  }

}
