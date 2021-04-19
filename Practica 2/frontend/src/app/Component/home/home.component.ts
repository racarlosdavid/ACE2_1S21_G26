import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarioServices/usuario.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UsuarioService) { }

  ngOnInit(): void {
  }

  probar(){
    this.userService.getUsers().subscribe((res) =>{
      console.log(res)
    })
  }
}
