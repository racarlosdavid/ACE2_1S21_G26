import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaInsertarActualizar } from 'src/app/models/RespuestaInsertarActualizar';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public rol='';

  constructor(private userService:UsuarioService, private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/user/profile']);
    }
   }

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
    veces_rendido:0,       //defecto
    veces_fallado:0,
    contadorTest:0
    
  }
  lista:string[] = ['M', 'F'];
  listaCouch:string[] = ['Couch', 'Atleta'];

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

  async verificarEmail():Promise<any>{
    if(this.usuario.correo == undefined){
      return false;
    }
    await this.userService.checkEmail(this.usuario.correo).subscribe(
      res=>{
        if(res.respuesta == true){
          alert('El email ingresado ya esta asociado a una cuenta en el sistema.');
          return false;
        }else{
          return true;
        }
      },err=>{
        console.log(err.mensaje);
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

      if(this.rol == 'Atleta'){
        this.usuario.estado_couch = 0;
      }else{
        this.usuario.estado_couch = 1;
      }
      console.log(this.usuario);
      this.userService.addUser(this.usuario).subscribe(
        res=>{
          if((<RespuestaInsertarActualizar>res).affectedRows == 0){
            alert('Hubo un problema al ingresar el usuario, intentelo nuevamente');
          }else{
            alert('Usuario ingresado correctamente');
          }
        },err=>{
          alert(err.respuesta);
        }
      ) 
    }else{
      console.log('Error en la verificacion de Email');
    }
  }
}
