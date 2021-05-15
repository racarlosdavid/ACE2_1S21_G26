import { Component, OnInit } from '@angular/core';
import  { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:Usuario={
    correo:'',
    contrasena:'',
    nombre:'',
    apellido:'',
    edad:null,
    genero:'',		//M o F
    peso_lb:null,
    estatura_cm:null,
    estado_sesion:0,	//1 esta abierta sus sesion, 0 esta cerrada, al agregar dejarla como 0
    estado_couch:0,	//1 couch  ;  0 atleta
    iduser_couch:null,     ///cuando es couch, enviar un null, de lo contrario enviar el id del couch
    id_test_contador:0    
  }
  lista:string[] = ['M', 'F'];
  listaCouch:string[] = ['Couch', 'Atleta'];
  listaDeCouchs:Usuario[] = [];
  rol ='';

  constructor(private router:Router, private userService:UsuarioService) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['']);
      console.log('lo intente');
      return;
    }
    let usuario:Usuario = <Usuario>JSON.parse(usuarioActivo);
    this.usuario = usuario;
    if(this.usuario.estado_couch == 1){
      this.rol = 'Couch';
    }else{
      this.rol = 'Atleta';
    }
  }

  ngOnInit(): void {
  }

  comprobarCampos():boolean{
    if(this.usuario.apellido==''  ||   this.usuario.edad== 0  ||  this.usuario.contrasena==''
      ||this.usuario.correo==''    ||   this.usuario.estatura_cm==0   ||   this.usuario.genero==''
      ||this.usuario.nombre==''   ||   this.usuario.peso_lb==0){
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
      if(this.usuario.iduser_couch == undefined){
        this.usuario.iduser_couch =null;
      }
      this.userService.updateUser(this.usuario).subscribe(
        res=>{
          if(res.affectedRows ==1){
            alert('Usuario Modificado con exito');
          }else{
            localStorage.removeItem('usuarioActivo');
            localStorage.setItem('usuarioActivo',JSON.stringify(this.usuario));
            alert("No se pudo verificar el usuario");
          }
          //this.actualizarCouch();
        },err=>{
          alert(err.respuesta);
        }
      ) 
    }
    
  }
}
