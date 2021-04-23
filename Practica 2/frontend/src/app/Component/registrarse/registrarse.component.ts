import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaInsertarActualizar } from 'src/app/models/respuesta-insertar-actualizar';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  
  public rol='';

  constructor(private userService:UsuarioService, private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/historial']);
    }
   }

  usuario:Usuario={
    idtest:0,
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
  }
  lista:string[] = ['M', 'F'];
  listaCouch:string[] = ['Couch', 'Atleta'];
  existe:boolean = false;
  listaDeCouchs:string[]=[];

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
    if(this.usuario.apellido==''  ||   this.usuario.edad==0  ||  this.usuario.contrasena==''
      ||this.usuario.correo==''    ||   this.usuario.estatura_cm==0   ||   this.usuario.genero==''
      ||this.usuario.nombre==''   ||   this.usuario.peso_lb==0){
      return false;
    }else{
      return true;
    }
  }

  async registrarse(){
    this.userService.checkEmail()
    .then(res => {
      console.log('Data', res);
      if (res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (res[index].correo === this.usuario.correo) {
            console.log(res[index].correo, " ", this.usuario.correo);
            this.existe = true;
            break;
          }else{
            this.existe = false;
          }
        }
      } else {
        this.existe = true;
      }
      if (this.existe == true) {
        alert('El email ingresado ya esta asociado a una cuenta en el sistema.');
      } else {
        //if(this.rol == 'Atleta'){
          this.usuario.estado_couch = 0;
        //}else{
          //this.usuario.estado_couch = 1;
        //}
        this.userService.addUser(this.usuario).subscribe(
          res=>{
            if((<RespuestaInsertarActualizar>res).affectedRows == 0){
              alert('Hubo un problema al ingresar el usuario, intentelo nuevamente');
            }else{
              alert('Usuario ingresado correctamente');
              this.router.navigate(['/iniciarSesion']);
            }
          },err=>{
            alert(err.respuesta);
          }
        ) 
      }
      
    })
    .catch(err => {
      console.log(err);
    });
  
    
  }
}
