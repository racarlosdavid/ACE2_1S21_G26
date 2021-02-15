import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createPublicKey } from 'crypto';
import { $ } from 'protractor';
import { Atleta } from 'src/app/models/Atleta';
import { Respuesta } from 'src/app/models/Respuesta';
import { AtletaService } from 'src/app/services/atleta-services/atleta.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private atletaService:AtletaService, private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/user/profile']);
    }
   }

  atleta:Atleta={
    nombre:'',
    apellido:'',
    genero:'',
    email:'',
    contrasena:'',
    edad:'',
    peso_lb:'',
    estatura_cm:'',
    iduser_couch:null

  }
  lista:string[] = ['M', 'F'];
  
  ngOnInit(): void {
    this.desplegarMenu()
  }

  desplegarMenu(){
    let element = document.querySelector(".dropdown-toggle")
    let lista = document.querySelector(".dropdown-menu")
    element?.addEventListener('click',function(){
     if (element != null && lista != null && !element.classList.contains('show')){
        console.log(element)
        console.log(lista)
        element.classList.add('show')
        lista.classList.add('show')
     }else if(element != null && lista != null && element.classList.contains('show')){
      element.classList.remove('show')
      lista.classList.remove('show')
     }
    });
  }

  comprobarCampos():boolean{
    if(this.atleta.apellido==''  ||   this.atleta.edad==''  ||  this.atleta.contrasena==''
      ||this.atleta.email==''    ||   this.atleta.estatura_cm==''   ||   this.atleta.genero==''
      ||this.atleta.nombre==''   ||   this.atleta.peso_lb==''){
      return false;
    }else{
      return true;
    }
  }

  async verificarEmail():Promise<any>{
    if(this.atleta.email == undefined){
      return false;
    }
    await this.atletaService.checkEmail(this.atleta.email).subscribe(
      res=>{
        let objResCheck = <Respuesta>res
        if(objResCheck.respuesta.length ==0){
          return true;
        }else{
          alert('El email ingresado ya esta asociado a una cuenta en el sistema.');
          return false;
        }
      },err=>{
        console.log('Error inesperado en la consulta al servidor');
        return false;
      }
      
    );
    return false;
  }

  registrarse(){
    if(!this.comprobarCampos()){
      alert('Por favor llene todos los campos');
      return;
    }else if(this.verificarEmail()){
      this.atletaService.addAtleta(this.atleta).subscribe(
        res=>{
          let objRes = <Respuesta>res;
          alert(objRes.mensaje)
        },err=>{
          console.log('Error inesperado en la consulta con el servidor');
        }
      ) 
    }else{
      console.log('Error en la verificacion de Email');
    }
  }
}
