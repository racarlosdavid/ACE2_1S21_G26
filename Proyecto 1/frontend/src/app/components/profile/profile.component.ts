import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UV_UDP_REUSEADDR } from 'constants';
import { Atleta } from 'src/app/models/Atleta';
import { Couch } from 'src/app/models/Couch';
import { Respuesta } from 'src/app/models/Respuesta';
import { AtletaService } from 'src/app/services/atleta-services/atleta.service';
import { CouchService } from 'src/app/services/couch-services/couch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  atleta:Atleta={
    nombre:'',
    apellido:'',
    genero:'',
    email:'',
    contrasena:'',
    edad:'',
    peso_lb:'',
    estatura_cm:'',
    iduser_couch:null,
    couch:''

  }
  lista:string[] = ['M', 'F'];
  listaCouch:string[] = ['Couch', 'Atleta'];
  listaDeCouchs:Couch[] = [];

  constructor(private router:Router, private atletaService:AtletaService, private couchService:CouchService) {
    this.listarCouchs();
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['']);
      console.log('lo intente');
      return;
    }
    let atleta:Atleta = <Atleta>JSON.parse(usuarioActivo);
    this.atleta = atleta;
    if(this.atleta.couch == 1){
      this.atleta.couch = 'Couch';
    }else{
      this.atleta.couch ='Atleta';
    }
  }

  ngOnInit(): void {
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

  actualizar(){
    
    if(!this.comprobarCampos()){
      alert('Por favor llene todos los campos');
      return;
    }else {
      if(this.atleta.iduser_couch == undefined){
        this.atleta.iduser_couch =null;
      }
      this.atletaService.updateAtleta(this.atleta).subscribe(
        res=>{
          let objRes = <Respuesta>res;
          alert(objRes.respuesta)
          if(objRes.status == 'c:'){
            localStorage.removeItem('usuarioActivo');
            localStorage.setItem('usuarioActivo',JSON.stringify(this.atleta));
          }
          //this.actualizarCouch();
        },err=>{
          console.log('Error inesperado en la consulta con el servidor');
        }
      ) 
    }
    
  }
/*
  actualizarCouch(){
    
    if (this.atleta.email ==''  || this.atleta.email == undefined){
      return;
    }
    if(this.atleta.iduser_couch == null || this.atleta.iduser_couch == undefined){
      this.couchService.quitarCouch(this.atleta.email).subscribe(
        res=>{
          let objRes = <Respuesta>res;
          alert(objRes.mensaje);
          if(objRes.status == 'c:'){
            localStorage.removeItem('usuarioActivo');
            localStorage.setItem('usuarioActivo',JSON.stringify(this.atleta))
          }
        },
        err=>{
          console.log('Error inesperado en la consulta con el servidor al quitar el couch');
        }
      );
      return;
    }
    this.couchService.asignarCouch(this.atleta.iduser_couch,this.atleta.email).subscribe(
      res=>{
        let objRes = <Respuesta>res;
        alert(objRes.mensaje);
      },
      err=>{
        console.log('Error inesperado en la consulta con el servidor para añadir al couch');
      }
    );
  }
*/
  listarCouchs(){
    this.couchService.listarCouchs().subscribe(
      res=>{
        let objRes:Respuesta = <Respuesta>res;
        this.listaDeCouchs = objRes.respuesta;
      },
      err=>{
        console.log('Error inesperado del servidor');
      }
    );
  }
}
