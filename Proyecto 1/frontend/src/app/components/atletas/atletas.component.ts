import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { CouchService } from 'src/app/services/couch-services/couch.service';
import { Atleta } from 'src/app/models/Atleta';
import { Respuesta } from 'src/app/models/Respuesta';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements OnInit {
  Res: any;
  objRes: any;
  nombreSeleccionado:any;
  idSeleccionado:any;
  elemento:any;
  atleta:any

  constructor(private router:Router, private couchService:CouchService, private route:ActivatedRoute, private userService:UserService) { }

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
            this.Res = <Respuesta>res;
            for(let item of this.Res.usuarios){
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
    this.atleta = <Atleta>JSON.parse(usuarioActivo);
    if(this.atleta.iduser == null){
      return;
    }
    /*let tipo = localStorage.getItem('tipoDato')
    if(tipo == null){
      return;
    }*/
    //console.log(atleta.iduser)
    if(this.atleta.couch != undefined){
      console.log(this.atleta.couch + "coach")
      this.couchService.getTeam(Number(this.atleta.couch)).subscribe((res) => {
        this.objRes = <Respuesta>res;
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
