import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouchService } from 'src/app/services/couch-services/couch.service';
import { Atleta } from 'src/app/models/Atleta';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements OnInit {

  objRes: any;

  constructor(private router:Router, private couchService:CouchService) { }

  ngOnInit(): void {
    this.showAtletas()
  }

  private showAtletas(): void{
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
    let atleta:Atleta = <Atleta>JSON.parse(usuarioActivo);
    if(atleta.iduser == null){
      return;
    }
    let tipo = localStorage.getItem('tipoDato')
    if(tipo == null){
      return;
    }
    //console.log(atleta.iduser)
    this.couchService.listaAtleta(1).subscribe((res) => {
      this.objRes = <Respuesta>res;
     // console.log(this.objRes.respuesta[0])
    })
  }
}
