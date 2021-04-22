import { Component, OnInit } from '@angular/core';
import { LecturaService } from 'src/app/services/lecturaServices/lectura.service';

@Component({
  selector: 'app-panel-real-time',
  templateUrl: './panel-real-time.component.html',
  styleUrls: ['./panel-real-time.component.css']
})
export class PanelRealTimeComponent implements OnInit {

  public rutaImagen:string = '';

  constructor(public lecturaService:LecturaService) { }

  ngOnInit(): void {
  }
  
}
