import { Component, OnInit } from '@angular/core';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service'
import { RegistroTest } from 'src/app/models/registro-test'
import { RegistroLectura } from 'src/app/models/registro-lectura';
import { ActivatedRoute, Params,Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  Res: any

  constructor(private lectura:LecturaService, private router:Router,private activatedR: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTests()
    this.activatedR.params.subscribe((params:Params) =>{
      //console.log(params)
      if(params.idtest != undefined){
        //console.log('Definido')
        this.showDatos(params.idtest)
      }else{
        console.log('sin parametro')
      }
    })
  }

  cargarTests(){
    let select = document.getElementById('selectElementId')
    if(select != undefined){
      this.lectura.getTest(1).subscribe((res) =>{
        this.Res = <RegistroTest[]>res
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

  selectTest(valor:String){
    if(valor == 'Seleccione'){
      alert('Debe seleccionar un test!')
      return
    }else{
      //console.log(valor)
      this.router.navigate(['historial',valor])
      
    }
  }
  showDatos(idtest:String){
    //carga fecha
    this.lectura.getTest(1).subscribe((res) =>{
      this.Res = <RegistroTest[]>res
      for(let item of this.Res){
        if(item.idtest == Number(idtest)){
          let titulo = document.getElementById('fechaTest')
          titulo.innerHTML = item.fecha + ' ' + item.hora
        }
      }
    })
    //carga máximo exhalado
    this.lectura.getExhalaMax(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let vmaxE = document.getElementById('vmaxE')
          vmaxE.innerHTML = String(item.dato)
        }
      }
    })
    //carga mínimo exhalado
    this.lectura.getExhalaMin(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let vminE = document.getElementById('vminE')
          vminE.innerHTML = String(item.dato)
        }
      }
    })
    //carga máximo inhalado
    this.lectura.getInhalaMax(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let vmaxI = document.getElementById('vmaxI')
          vmaxI.innerHTML = String(item.dato)
        }
      }
    })
    //carga mínimo inhalado
    this.lectura.getInhalaMin(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let vminI = document.getElementById('vminI')
          vminI.innerHTML = String(item.dato)
        }
      }
    })
    //carga promedio exhalado
    this.lectura.getExhalaAvg(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let avgE = document.getElementById('avgE')
        avgE.innerHTML = String(item.dato)
        }
      }
    })
    //carga promedio inhalado
    this.lectura.getInhalaAvg(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let avgI = document.getElementById('avgI')
          avgI.innerHTML = String(item.dato)
        }
      }
    })
    //carga vo2 max
    this.lectura.getVo2Max(1).subscribe((res) =>{
      let Res = <RegistroLectura[]>res
      for(let item of Res){
        if(item.idtest == Number(idtest)){
          let vo2max = document.getElementById('vo2max')
          vo2max.innerHTML = String(item.dato)
        }
      }
    })
  }
}
