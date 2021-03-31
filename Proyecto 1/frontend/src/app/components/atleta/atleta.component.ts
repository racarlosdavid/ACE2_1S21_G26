import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { CouchService } from 'src/app/services/couchServices/couch.service';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service';

@Component({
  selector: 'app-atleta',
  templateUrl: './atleta.component.html',
  styleUrls: ['./atleta.component.css']
})
export class AtletaComponent implements OnInit {

  Res: any;
  objRes: any;
  nombreSeleccionado:any;
  idSeleccionado:any;
  elemento:any;
  atleta:any

  constructor(private router:Router, private couchService:CouchService, private route:ActivatedRoute, private userService:UsuarioService) { }

  ngOnInit(): void {
    this.showAtletas()
    this.route.params.subscribe(
      (params: Params) => {
        this.idSeleccionado = params.idUser
        console.log(this.idSeleccionado)
        //this.elemento = document.querySelector<HTMLElement>('#mensaje')
        if (this.idSeleccionado != undefined){
          //this.elemento.innerHTML = this.idSeleccionado
          this.userService.getUsers().subscribe((res) => {
            this.Res = res;
            for(let item of this.Res){
              if(item.iduser == this.idSeleccionado){
                console.log(item.nombre + " " + item.apellido)
                localStorage.setItem('idAtletaGrafica',this.idSeleccionado)
                localStorage.setItem('nombreAtletaGrafica',item.nombre + " " + item.apellido)
              }
            }
          })
                    
        }else{
          //this.elemento.innerHTML = ""
        }
      }
    )
  }

  private showAtletas(): void{
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    this.atleta = <Usuario>JSON.parse(usuarioActivo);
    if(this.atleta.iduser == null){
      return;
    }
    /*let tipo = localStorage.getItem('tipoDato')
    if(tipo == null){
      return;
    }*/
    //console.log(this.atleta)
    
    if(this.atleta.estado_couch == 1   ||   this.atleta.estado_couch == '1'  ||  this.atleta.estado_couch == "1"){
      //console.log(this.atleta.iduser_couch + "coach")
      this.couchService.getTeam(Number(this.atleta.iduser)).subscribe((res) => {
        console.log(res);
        this.objRes = res;
        //console.log(this.objRes.respuesta)
      })
    }else{
      return;
    }
  }
  public selectMyData(){
    localStorage.setItem('idAtletaGrafica',this.atleta.iduser)
    localStorage.setItem('nombreAtletaGrafica',this.atleta.nombre + " " + this.atleta.apellido)
    this.router.navigate(['principal'])
  }
}
